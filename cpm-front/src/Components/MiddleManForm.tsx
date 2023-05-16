import React, {FC} from 'react';
import {Table, Input, Paper, TextInput, Button, Text} from '@mantine/core';
import {useForm} from '@mantine/form';
import {preDataDto} from "../dto/preDataDto";
import {SupplyAndDemandDto} from "../dto/supplyAndDemandDto";

interface MiddleManFormProps {
}

export const MiddleManForm: FC<MiddleManFormProps> = ({}) => {

    const [suppliers, setSuppliers] = React.useState<string[]>([]);
    const [customers, setCustomers] = React.useState<string[]>([]);
    const [costPerPath, setCostPerPath] = React.useState<number[][]>([]);
    const [customerInput, setCustomerInput] = React.useState<number[]>([]);
    const [supplierInput, setSupplierInput] = React.useState<number[]>([]);
    const [costPerPathInput,setCostPerPathInput] = React.useState<number[]>([]);


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
                row.push(j);
            }
            costPerPath.push(row);
        }
        console.log(costPerPath)
        console.log(suppliers);
        console.log(customers);
    };

    return (
        <div className={"middle-man-container"}>
            <Paper className={"application-container"} shadow="lg" radius="lg" p="lg" withBorder>
                <form onSubmit={preDataForm.onSubmit((values) => handleOnSubmitPreData(values))}>
                    <Paper>
                        <TextInput required type={"number"}
                                   placeholder={"Podaj ilosc dostawcow"} {...preDataForm.getInputProps("suppliers")}></TextInput>
                        <TextInput required type={"number"}
                                   placeholder={"Podaj ilosc odbiorcow"} {...preDataForm.getInputProps("customers")}></TextInput>
                        <Button type={'submit'}>Zatwierdź</Button>
                    </Paper>
                </form>
            </Paper>
            <Table style={{width: "60%", textAlign: "center", marginLeft: "20%", marginTop: "2%"}} striped
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
                            <td key={index}>sad</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};