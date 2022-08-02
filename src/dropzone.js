import React, {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Space ,message} from 'antd';
import {NFTStorage} from "nft.storage";
import Input from "antd/es/input/Input";
import {useContractWrite} from "wagmi";
import {CONTRACT_ADDRESS} from "./contracts/address/Address";
import {ABI} from "./contracts/abi/CIDGRAPH";
import moment from "moment";
import sha256 from 'crypto-js/sha256';
const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk4YjFDRUJDMDc5Mzk4NWNGNzM2NzNiNDI1MTVlOTQ0NzM4MmM3RGYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1OTA5NTg0MTA2NSwibmFtZSI6ImZvcmdldCJ9.0tmtPzZu2_0uTGQ5UVUUWx53mar0-I62rqcUb6mMieg'
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

export function DropZone(props) {

    const addWrite  = useContractWrite({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: ABI,
        functionName: 'add',
        onSuccess(data) {
            console.log('Success', data)
        },
    })

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        maxFiles:1
    });
    // @ts-ignore
    const [loading, setLoading] = useState(false);
    const [recipient,setRecipient] = useState(null)
    const [cid,setCid] = useState(null)

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));


    const uploadFiles = async () => {
        setLoading(true)
        const result = await client.storeBlob(acceptedFiles[0])
        console.log(result)
        setCid(result)
        setLoading(false)
    };

    const onBlockChain = ()=>{
        if(!cid){
            return
        }
        if(!recipient){
            return
        }
        const epochTime = Math.round(moment().format('X'));
        console.log(epochTime)
        const acceptedFile = acceptedFiles[0]
        console.log(acceptedFile)
        const fileHash = sha256(cid).toString();
        console.log(fileHash)
        const args = [cid,fileHash, epochTime,recipient]
        console.log(args)
        addWrite.write({args:args})
    }

    const recipientInput = async (event)=>{
        const value = event.target.value;
        setRecipient(value)
    }

    return (
        <section style={{background:"#8e8989",width:"40%",fontSize:"16px",alignContent:"center"}}>
            <Input style={{width:"80%",marginTop:"12px",fontSize:"16px",alignContent:"center"}}
                   placeholder="recipient"
                   onChange={(e)=>recipientInput(e)}/>;
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
                {/*<h4>Files</h4>*/}
                <ul>{files}</ul>
            </aside>

            {
                acceptedFiles.length>0 && <Button
                    style={{marginBottom:"8px"}}
                    type="primary"
                    icon={<PoweroffOutlined />}
                    loading={loading}
                    onClick={() => uploadFiles()}
                >
                    Upload File
                </Button>
            }
            {
                cid && <Button
                    style={{marginBottom:"8px",marginLeft:"4px"}}
                    type="primary"
                    onClick={() => onBlockChain()}
                >
                    sharing File on blockChain
                </Button>
            }
        </section>
    );
}

<DropZone />