import React, {useState} from "react";
import { Input, Space } from 'antd';
import {useContract, useContractRead, useQuery, useSigner} from "wagmi";
import {CONTRACT_ADDRESS} from "./contracts/address/Address";
import {ABI} from "./contracts/abi/CIDGRAPH";
const { Search } = Input;

export function SearchZone() {
    const [cids,setCids] = useState([])
    const { data: signer, isError, isLoading } = useSigner()

    const contract = useContract({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: ABI,
        signerOrProvider: signer,
    })


    const files = cids.map((cid) => (
        <li key={cid}>
            {cid}
        </li>
    ));


    const onSearch = async (value) => {
        console.log(value)
        const a = await contract.functions.getHashFromAddress(value);
        console.log(a)
        setCids(a[1])
    }

    return (
        <section style={{background:"#8e8989",width:"40%",fontSize:"16px",alignContent:"center",marginTop:"32px",paddingTop:"12px"}}>
            <Search placeholder="search by recipient"  onSearch={onSearch} />
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </section>
    );
}
