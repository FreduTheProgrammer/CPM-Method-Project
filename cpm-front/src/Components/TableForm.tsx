import React, {FC} from 'react';
import { Table, Paper, TextInput, Button, CloseButton } from '@mantine/core';
import {TableDto} from '../dto/TableDto'
import { useForm } from '@mantine/form';
import "../Styles/ActivityFormStyle.css";
interface TableFormProps {}

export const TableForm: FC<TableFormProps> = ({}) =>{

    const [activities, setActivities] = React.useState<TableDto[]>([]);

    const validateNumberInput = (value: any)=>{
        if(isNaN(value)){
            return 'Input must be a number';
        }
    }
    const validateTextInput =(value:any)=>{
        const regex=/^A-Z$/;

        if(!regex.test(value)){
            return 'Input must be a single uppercase letter';
        }
    }

    const rowForm = useForm<TableDto>({
        initialValues:{
            Czynnosc: "",
            Czas: 0,
            ZdarzeniePoprzedzajace:""
        },
    })

    const handleOnSubmit=(row: TableDto)=>{
        const data: TableDto={
            Czynnosc: row.Czynnosc,
            Czas: row.Czas,
            ZdarzeniePoprzedzajace: row.ZdarzeniePoprzedzajace
        }
        activities.push(data);

    }

    const generateNetDiagram=()=>{
        console.log(activities);
    }

    const ths = (
        <tr>
            <th>Czynność</th>
            <th>Czas</th>
            <th>Czynność poprzedzająca</th>
            <th></th>
        </tr>
    );

    return (
        <div>
            <Table style={{marginBottom:"2%"}} striped highlightOnHover withBorder withColumnBorders>
                <thead>{ths}</thead>
                <tbody>{activities.map((row)=>(
                    <tr>
                        <td>{row.Czynnosc}</td>
                        <td>{row.Czas}</td>
                        <td>{row.ZdarzeniePoprzedzajace}</td>
                        <td><CloseButton/></td>
                    </tr>
                ))}</tbody>
            </Table>
            <form onSubmit={rowForm.onSubmit((values)=>handleOnSubmit(values))}>
                <Paper className={"container-parent-rows"} shadow="xs" radius="md" p="sm" withBorder>
                    <TextInput placeholder={"Wprowadź czynność"} required type={"text"} {...rowForm.getInputProps("Czynnosc")} />
                    <TextInput placeholder={"Wprowadź czas"} required type={"number"} {...rowForm.getInputProps("Czas")}/>
                    <TextInput placeholder={"Wprowadź czynność poprzedzającą"} required type={"text"} {...rowForm.getInputProps("ZdarzeniePoprzedzajace")}/>
                    <Button type={'submit'} color="dark" uppercase>
                        Dodaj czynność
                    </Button>
                    <Button onClick={()=>generateNetDiagram()} uppercase>
                        Generuj
                    </Button>
                </Paper>
            </form>
        </div>
    );
};