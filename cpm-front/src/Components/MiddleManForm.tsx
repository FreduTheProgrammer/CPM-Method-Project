import React, {FC, useEffect} from 'react';
import {Table, Input, Paper, TextInput, Button, Text, Flex, Modal} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {useForm} from '@mantine/form';
import {preDataDto} from "../dto/preDataDto";
import {SupplyAndDemandDto} from "../dto/supplyAndDemandDto";
import {PostDataDto} from "../dto/PostDataDto";
import {wrongDataForSupplierAndCustomers} from "./notification";
import {Customer, PostDataDtov2, Supplier} from "../dto/PostDataDtoV2";
import {Responsev2} from "../dto/ResultsDto";
import {postDataMiddleMan} from "./api";

interface MiddleManFormProps {
}

export const MiddleManForm: FC<MiddleManFormProps> = ({}) => {

    const [suppliers, setSuppliers] = React.useState<string[]>([]);
    const [customers, setCustomers] = React.useState<string[]>([]);
    const [costPerPath, setCostPerPath] = React.useState<number[][]>([]);
    const [customerInput, setCustomerInput] = React.useState<number[]>([]);
    const [supplierInput, setSupplierInput] = React.useState<number[]>([]);
    const [opacity, setOpacity] = React.useState(0)
    const [purchasePrizes, setPurchasePrizes] = React.useState<number[]>([]);
    const [sellingPrizes, setSellingPrizes] = React.useState<number[]>([]);
    const [opacityMiddleMan, setOpacityMiddleMan] = React.useState(0);
    let [postDataV2, setPostDataV2] = React.useState<PostDataDtov2>();
    const [displayResult, setDisplayResult] = React.useState(0)
    const [responsev2, setResponsev2] = React.useState<Responsev2>()
    const [open, setOpen] = React.useState(false);
    const [indyvidualProfitMatrix, setIndyvidualProfixMatrix] = React.useState<number[][]>([])
    const [optimalTransportMatrix, setOptimalTransportMatrix] = React.useState<number[][]>([])
    const [displayTable, setDisplayTable] = React.useState(0)

    const costPerPathv2 =[[7,4],[3,5]];


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
                row.push(Math.floor(Math.random() * (21 - 1) + 1));
            }
            costPerPath.push(row);
        }

        setOpacity(1);
    };

    const postDataAndCalculate = () => {
        if (supplierInput.length !== suppliers.length || customerInput.length !== customers.length) {
            wrongDataForSupplierAndCustomers();
        } else {
            let allSuply = 0;
            let allCust = 0;
            supplierInput.map((value) => {
                allSuply += value;
            });
            customerInput.map((value => {
                allCust += value;
            }))
            if (allSuply !== allCust) {
                setOpacityMiddleMan(1);
            }
        }
    }

    const postAllDataToBackend = () => {
        postDataV2 = {
            customers: [],
            suppliers: []
        }
        for (let i = 0; i < suppliers.length; i++) {
            let newSupplier: Supplier = {
                supply: supplierInput[i],
                purchasePrice: purchasePrizes[i],
                transportCosts: []
            }
            for (let j = 0; j < costPerPathv2[i].length; j++) {
                newSupplier.transportCosts?.push(costPerPathv2[i][j]);
            }
            postDataV2?.suppliers.push(newSupplier);
        }
        for (let i = 0; i < customers.length; i++) {
            let newCustomer: Customer = {
                demand: customerInput[i],
                sellingPrice: sellingPrizes[i]
            }
            postDataV2?.customers.push(newCustomer);
        }
        resultsFromBackend(postDataV2);
    }

    const resultsFromBackend = async (postData: any) => {
        try {
            await postDataMiddleMan(postData).then(data => {
                setResponsev2(data.response);
                console.log(responsev2)
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (responsev2?.Individualprofits && responsev2?.Optimaltransport) {
            calculateMatrix(responsev2.Individualprofits, responsev2.Optimaltransport);
        }
    }, [responsev2]);

    const calculateMatrix = (indyvidualProfit: number[], optimalTransport: number[]) =>{
        let index =0;
       let rowLenght = customerInput.length;
       for(let i=0; i < indyvidualProfit.length; i++){
           if(i === rowLenght){
               index++;
               rowLenght=rowLenght*2;
           }
           if (!indyvidualProfitMatrix[index]) {
               indyvidualProfitMatrix[index] = [];
               optimalTransportMatrix[index] = []
           }
           indyvidualProfitMatrix[index].push(indyvidualProfit[i]);
           optimalTransportMatrix[index].push(optimalTransport[i]);
       }
       console.log(indyvidualProfitMatrix);
       console.log(optimalTransportMatrix);
    }

    return (
        <div className={"middle-man-container"}>
            <Paper style={{margin: "2% 5%"}} className={"application-container"} shadow="lg" radius="lg" p="lg"
                   withBorder>
                <h3>Wprowadź dane:</h3>
                <form onSubmit={preDataForm.onSubmit((values) => handleOnSubmitPreData(values))}>
                    <Paper>
                        <TextInput required type={"number"}
                                   placeholder={"Podaj ilosc dostawcow"} {...preDataForm.getInputProps("suppliers")}></TextInput>
                        <TextInput required type={"number"}
                                   placeholder={"Podaj ilosc odbiorcow"} {...preDataForm.getInputProps("customers")}></TextInput>
                        <Button onClick={()=>setDisplayTable(1)} style={{marginTop: "4%"}} type={'submit'}>Zatwierdź</Button>
                    </Paper>
                </form>
            </Paper>
            <Table style={{textAlign: "center", marginTop: "2%", opacity:`${displayTable}`}} striped
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
                        }} style={{textAlign: "center"}} required type={"number"}
                                                                                          placeholder={`Podaj popyt dla ${value}`}
                        />
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {costPerPathv2.map((row, index) => (
                    <tr key={index}>
                        <th>{suppliers[index]} <TextInput onChange={(e) => {
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
            <Button onClick={() => postDataAndCalculate()} style={{marginTop: "1%", opacity: `${opacity}`}}>Zatwierdź
                dane</Button>
            <Paper style={{
                textAlign: "center",
                opacity: `${opacityMiddleMan}`,
                display: "flex",
                flexDirection: "column",
                marginTop: "1%"
            }}>
                <h3> Wprowadz ceny sprzedazy dla Odbiorcow oraz cene zakupu u Dostawców</h3>
                <Flex
                    direction={{base: 'column', sm: 'row'}}
                    gap={{base: 'sm', sm: 'lg'}}
                    justify={{sm: 'center'}}
                >
                    {supplierInput.map((vaule, index) => (
                        <TextInput onChange={(event) => {
                            const input = parseInt(event.currentTarget.value);
                            const updatedInput = [...purchasePrizes];
                            updatedInput[index] = input;
                            setPurchasePrizes(updatedInput);
                        }} placeholder={`Dostawca ${index + 1}`}/>
                    ))}
                </Flex>
                <Flex
                    direction={{base: 'column', sm: 'row'}}
                    gap={{base: 'sm', sm: 'lg'}}
                    justify={{sm: 'center'}}
                >
                    {customerInput.map((vaule, index) => (
                        <TextInput onChange={(event) => {
                            const input = parseInt(event.currentTarget.value);
                            const updatedInput = [...sellingPrizes];
                            updatedInput[index] = input;
                            setSellingPrizes(updatedInput);
                        }} placeholder={`Odbiorca ${index + 1}`}/>
                    ))}
                </Flex>
                <Button onClick={() => {
                    postAllDataToBackend()
                    setDisplayResult(1);
                    setOpen(true);
                }
                } style={{marginTop: "1%"}}>Zatwierdź</Button>
            </Paper>
            <div style={{backgroundColor:"white",opacity: `${displayResult}`, display:"flex", alignItems:"center", flexDirection:"row", justifyContent:"center"}}>
                <div>
                    <h3>Individual Profits:</h3>
                    <Flex
                        mih={50}
                        bg="rgba(0, 0, 0, .3)"
                        gap="md"
                        justify="center"
                        align="flex-start"
                        direction="row"
                        wrap="wrap"
                        style={{marginTop:"1%",backgroundColor:"white"}}
                    >
                        {indyvidualProfitMatrix.map((row,index)=>{
                            if ( index < customerInput.length){
                                return (
                                    <div key={index}>
                                        {row.map((value, rowIndex)=>(
                                            <div key={rowIndex}>{value}</div >
                                        ))}
                                    </div>
                                )
                            }
                            return null;
                        })}

                    </Flex>
                </div>
                <div style={{marginLeft:"2%"}}>
                    <h3>Optimal Transport:</h3>
                    <Flex
                        mih={50}
                        bg="rgba(0, 0, 0, .3)"
                        gap="md"
                        justify="center"
                        align="flex-start"
                        direction="row"
                        wrap="wrap"
                        style={{marginTop:"1%",backgroundColor:"white"}}
                    >
                        {optimalTransportMatrix.map((row,index)=>{
                            if ( index < customerInput.length){
                                return (
                                    <div key={index}>
                                        {row.map((value, rowIndex)=>(
                                            <div>
                                                <span key={rowIndex}>{value}</span >
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                            return null;
                        })}

                    </Flex>
                </div>
                <div style={{marginLeft:"2%"}}>
                    <Flex
                        mih={50}
                        bg="rgba(0, 0, 0, .3)"
                        gap="md"
                        justify="center"
                        align="flex-start"
                        direction="column"
                        wrap="wrap"
                        style={{marginTop:"3%",backgroundColor:"white"}}
                    >
                        <Text><b>Income:</b> {responsev2?.Income}</Text>
                        <Text><b>Profit:</b> {responsev2?.Profit}</Text>
                        <Text><b>Total Cost:</b> {responsev2?.Total_cost} </Text>
                    </Flex>
                </div>
            </div>
        </div>
    );
};