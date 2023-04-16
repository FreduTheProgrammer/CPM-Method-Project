import React, {FC, useEffect} from 'react';
import {Table, Paper, TextInput, Button, CloseButton} from '@mantine/core';
import {TableDto} from '../dto/TableDto'
import { GanttChart } from './GanttChart';
import {useForm} from '@mantine/form';
import "../Styles/ActivityFormStyle.css";
import {postData} from "./api";
import { GanttChartType, GanttDto } from '../dto/GanttDto';

interface TableFormProps {
}

export const TableForm: FC<TableFormProps> = ({}) => {

    const [activities, setActivities] = React.useState<TableDto[]>([]);
    const [ids, setIds] = React.useState(0);
    const [diagram,setDiagram] = React.useState();
    const [isClicked, setIsClicked] = React.useState(false);
    const [ganttActivities, setGanttActivities] = React.useState<GanttDto[]>([]);

    const rowForm = useForm<TableDto>({
        initialValues: {
            id: 0,
            activity: "",
            duration: 0,
            predecessors: []
        },
        validate: {
            activity: (value) => /^[a-z]/.test(value),
            predecessors: (value) => /^[a-z]/.test(value.toString()),
        }
    })

    const handleOnSubmit = (row: TableDto) => {
        let listOfLetters = row.predecessors.toString().split(",").map((letter)=>letter.trim());
        if(listOfLetters[0]==='') listOfLetters=[];
        const data: TableDto = {
            id: ids,
            activity: row.activity,
            duration: row.duration,
            predecessors: listOfLetters
        }
        console.log(data);
        activities.push(data);
    }

    const removeActivity = (id: number) => {
        const dataAfterRemoveRow = activities.filter((row) => id !== row.id);
        setActivities(dataAfterRemoveRow);
    }

    const generateNetDiagram = async () => {
        await postData(activities).then((data)=>{
            console.log(data)
            setDiagram(data.response)
            setGanttActivities(data.activities.map((activity: any) => {
                return activity as GanttDto;
            }))
            setIsClicked(true);
        })
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
            <Table style={{marginBottom: "2%"}} striped highlightOnHover withBorder withColumnBorders>
                <thead>{ths}</thead>
                <tbody>{activities.map((row) => (
                    <tr key={row.id}>
                        <td>{row.activity}</td>
                        <td>{row.duration}</td>
                        <td>{row.predecessors}</td>
                        <td><CloseButton onClick={() => removeActivity(row.id)}/></td>
                    </tr>
                ))}</tbody>
            </Table>
            <form onSubmit={rowForm.onSubmit((values) => handleOnSubmit(values))}>
                <Paper className={"container-parent-rows"} shadow="xs" radius="md" p="sm" withBorder>
                    <div className={"container-children"}>
                        <TextInput label={"Czynność"} placeholder={"Wprowadź czynność"} required type={"text"}
                                   maxLength={15} {...rowForm.getInputProps("activity")}
                        />
                        <TextInput label={"Czas"} placeholder={"Wprowadź czas"} required
                                   type={"number"} {...rowForm.getInputProps("duration")}/>
                        <TextInput label={"Czynność poprzedzająca"} placeholder={"Wprowadź czynność poprzedzającą"}
                                   type={"text"} {...rowForm.getInputProps("predecessors")}/>
                    </div>
                    <div className={"container-children"}>
                        <Button onClick={() => {
                            setIds(ids + 1);
                        }} type={'submit'} color="dark" uppercase>
                            Dodaj czynność
                        </Button>
                        <Button onClick={() =>{
                            generateNetDiagram();
                        }
                        } uppercase>
                            Generuj
                        </Button>
                        <Button color="red" onClick={() => {
                            setActivities([]);
                            setIds(0);
                        }}>
                            Wyczyść listę
                        </Button>
                    </div>
                </Paper>
            </form>
            {isClicked && <>
                            <img src={`${diagram}`} />
                            <GanttChart data={ganttActivities} type={GanttChartType.AsSoonAsPossible}/>
                            <GanttChart data={ganttActivities} type={GanttChartType.AsLateAsPossible}/>
                          </>
            }
        </div>
    );
};