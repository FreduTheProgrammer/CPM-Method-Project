import React, {FC} from 'react';
import {Table, Paper, TextInput, Button, CloseButton} from '@mantine/core';
import {TableDto} from '../dto/TableDto'
import {useForm} from '@mantine/form';
import "../Styles/ActivityFormStyle.css";

interface TableFormProps {
}

export const TableForm: FC<TableFormProps> = ({}) => {

    const [activities, setActivities] = React.useState<TableDto[]>([]);
    const [ids, setIds] = React.useState(0);


    const rowForm = useForm<TableDto>({
        initialValues: {
            Id: 0,
            Activity: "",
            Duration: undefined,
            Predecessors: ""
        },
        validate: {
            Activity: (value) => /^[a-z]/.test(value),
            Predecessors: (value) => /^[a-z]/.test(value),
        }
    })

    const handleOnSubmit = (row: TableDto) => {
        const data: TableDto = {
            Id: ids,
            Activity: row.Activity,
            Duration: row.Duration,
            Predecessors: row.Predecessors
        }
        activities.push(data);
    }

    const removeActivity = (id: number) => {
        const dataAfterRemoveRow = activities.filter((row) => id !== row.Id);
        setActivities(dataAfterRemoveRow);
    }

    const generateNetDiagram = () => {
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
            <Table style={{marginBottom: "2%"}} striped highlightOnHover withBorder withColumnBorders>
                <thead>{ths}</thead>
                <tbody>{activities.map((row) => (
                    <tr key={row.Id}>
                        <td>{row.Activity}</td>
                        <td>{row.Duration}</td>
                        <td>{row.Predecessors}</td>
                        <td><CloseButton onClick={() => removeActivity(row.Id)}/></td>
                    </tr>
                ))}</tbody>
            </Table>
            <form onSubmit={rowForm.onSubmit((values) => handleOnSubmit(values))}>
                <Paper className={"container-parent-rows"} shadow="xs" radius="md" p="sm" withBorder>
                    <div className={"container-children"}>
                        <TextInput label={"Czynność"} placeholder={"Wprowadź czynność"} required type={"text"}
                                   maxLength={1} {...rowForm.getInputProps("Activity")}
                        />
                        <TextInput label={"Czas"} placeholder={"Wprowadź czas"} required
                                   type={"number"} {...rowForm.getInputProps("Duration")}/>
                        <TextInput label={"Czynność poprzedzająca"} placeholder={"Wprowadź czynność poprzedzającą"} maxLength={1} required
                                   type={"text"} {...rowForm.getInputProps("Predecessors")}/>
                    </div>
                    <div className={"container-children"}>
                        <Button onClick={() => {
                            setIds(ids + 1);
                        }} type={'submit'} color="dark" uppercase>
                            Dodaj czynność
                        </Button>
                        <Button onClick={() => generateNetDiagram()} uppercase>
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
        </div>
    );
};