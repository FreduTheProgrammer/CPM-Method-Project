import {Autocomplete} from "@mantine/core";

export interface TableDto {
    Id:                     number;
    Czynnosc:               string;
    Czas:                   number | undefined;
    ZdarzeniePoprzedzajace: string;
}