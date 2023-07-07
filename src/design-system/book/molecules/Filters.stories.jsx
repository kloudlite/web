import { ArrowsDownUp, CaretDownFill, List, SquaresFour } from "@jengaicons/react";
import { Button } from "../../components/atoms/button";
import { ButtonGroup } from "../../components/atoms/button-groups";
import { Filters } from "../../components/molecule/filters";

export default {
    title: "Molecules/Filters",
    component: Filters,
    tags: ['autodocs'],
    argTypes: {
        filterActions: {
            table: {
                disable: true
            }
        }
    }
}

export const DefaultFilter = {
    args: {
        filterActions: <>

        </>
    }
}