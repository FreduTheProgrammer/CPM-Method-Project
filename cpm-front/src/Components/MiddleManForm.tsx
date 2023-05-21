import React, {FC} from 'react';
import {Table, Input, Paper, TextInput, Button, Text, Flex} from '@mantine/core';
import {useForm} from '@mantine/form';
import {preDataDto} from "../dto/preDataDto";
import {SupplyAndDemandDto} from "../dto/supplyAndDemandDto";
import {PostDataDto} from "../dto/PostDataDto";
import {wrongDataForSupplierAndCustomers} from "./notification";

interface MiddleManFormProps {
}

export const MiddleManForm: FC<MiddleManFormProps> = ({}) => {

    const [suppliers, setSuppliers] = React.useState<string[]>([]);
    const [customers, setCustomers] = React.useState<string[]>([]);
    const [costPerPath, setCostPerPath] = React.useState<number[][]>([]);
    const [customerInput, setCustomerInput] = React.useState<number[]>([]);
    const [supplierInput, setSupplierInput] = React.useState<number[]>([]);
    const [opacity, setOpacity] = React.useState(0)
    const [purchasePrizes,setPurchasePrizes] = React.useState<number[]>([]);
    const [sellingPrizes, setSellingPrizes] = React.useState<number[]>([]);
    const [opacityMiddleMan, setOpacityMiddleMan] = React.useState(0);
    let [postData, setPostData] = React.useState<PostDataDto>();


    const preDataForm = useForm<preDataDto>({
        initialValues: {
            suppliers: '',
            customers: '',
        },
    });

    const handleOnSubmitPreData = (data: preDataDto) => {
        for (let i = 0; i < Number(data.suppliers); i++) {
            suppliers.push(`Dostawca ${i + 1}`);
        }
        for (let i = 0; i < Number(data.customers); i++) {
            customers.push(`Odbiorca ${i + 1}`);
        }

        for (let i = 0; i < Number(data.suppliers); i++) {
            let row: number[] = [];
            for (let j = 0; j < Number(data.customers); j++) {
                row.push(Math.floor(Math.random()*(21-1)+1));
            }
            costPerPath.push(row);
        }

        setOpacity(1);
    };

    const postDataAndCalculate = () =>{
        if(supplierInput.length !== suppliers.length || customerInput.length !== customers.length){
            wrongDataForSupplierAndCustomers();
        }else{
            let allSuply =0;
            let allCust=0;
            supplierInput.map((value)=>{
                allSuply+=value;
            });
            customerInput.map((value => {
                allCust+= value;
            }))
            if(allSuply === allCust){
                setOpacityMiddleMan(1);
            }
        }
    }

    const postAllDataToBackend = () =>{
         postData={
             Customers: customerInput,
             Suppliers: supplierInput,
             CostPerPathArray: costPerPath,
             SellingPrizes: sellingPrizes,
             PurchasePrizes: purchasePrizes
        }
        console.log(postData);
         // obsluga endpointa
    }

    return (
        <div className={"middle-man-container"}>
            <Paper style={{margin:"2% 5%"}} className={"application-container"} shadow="lg" radius="lg" p="lg" withBorder>
                <h3>Wprowadź dane:</h3>
                <form onSubmit={preDataForm.onSubmit((values) => handleOnSubmitPreData(values))}>
                    <Paper>
                        <TextInput required type={"number"}
                                   placeholder={"Podaj ilosc dostawcow"} {...preDataForm.getInputProps("suppliers")}></TextInput>
                        <TextInput required type={"number"}
                                   placeholder={"Podaj ilosc odbiorcow"} {...preDataForm.getInputProps("customers")}></TextInput>
                        <Button style={{marginTop:"4%"}} type={'submit'}>Zatwierdź</Button>
                    </Paper>
                </form>
            </Paper>
                <Table style={{textAlign: "center", marginTop: "2%"}} striped
                       highlightOnHover withBorder withColumnBorders>
                    <thead>
                    <tr>
                        <th></th>
                        {customers.map((value, index) => (
                            <th style={{textAlign: "center"}} key={index}> {value} <TextInput onChange={(event) => {
                                const input = parseInt(event.currentTarget.value);
                                const updatedInput = [...customerInput];
                                updatedInput[index] = input;
                                setCustomerInput(updatedInput)
                            }} style={{textAlign: "center"}} required type={"number"} placeholder={`Podaj popyt dla ${value}`}
                            />
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {costPerPath.map((row, index) => (
                        <tr key={index}>
                            <th>{suppliers[index]} <TextInput  onChange={(e) => {
                                const input = parseInt(e.target.value);
                                const updatedInput = [...supplierInput];
                                updatedInput[index] = input;
                                setSupplierInput(updatedInput);
                            }} required type={"number"}
                                                               placeholder={`Podaj podaż dla ${suppliers[index]}`}/></th>
                            {row.map((cell, index) => (
                                <td key={index}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Button onClick={()=>postDataAndCalculate()} style={{marginTop:"1%",opacity:`${opacity}`}}>Zatwierdź dane</Button>
            <Paper  style={{textAlign:"center" ,opacity:`${opacityMiddleMan}` , display:"flex", flexDirection:"column", marginTop:"1%"}}>
                <h3> Wprowadz ceny sprzedazy dla Odbiorcow oraz cene zakupu u Dostawców</h3>
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    gap={{ base: 'sm', sm: 'lg' }}
                    justify={{ sm: 'center' }}
                >
                    {supplierInput.map((vaule, index)=>(
                        <TextInput onChange={(event) => {
                            const input = parseInt(event.currentTarget.value);
                            const updatedInput = [...sellingPrizes];
                            updatedInput[index] = input;
                            setSellingPrizes(updatedInput);
                        }} placeholder={`Dostawca ${index+1}`}/>
                    ))}
                </Flex>
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    gap={{ base: 'sm', sm: 'lg' }}
                    justify={{ sm: 'center' }}
                >
                    {customerInput.map((vaule, index)=>(
                        <TextInput onChange={(event) => {
                            const input = parseInt(event.currentTarget.value);
                            const updatedInput = [...purchasePrizes];
                            updatedInput[index] = input;
                            setPurchasePrizes(updatedInput);
                        }} placeholder={`Odbiorca ${index+1}`}/>
                    ))}
                </Flex>
                <Button onClick={()=>postAllDataToBackend()} style={{marginTop:"1%"}}>Zatwierdź</Button>
            </Paper>
        </div>
    );
};