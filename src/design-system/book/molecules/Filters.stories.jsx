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
            <ButtonGroup
                items={
                    [
                        {
                            label: "Provider",
                            value: "provider",
                            key: "provider",
                            suffix: CaretDownFill
                        },
                        {
                            label: "Region",
                            value: "region",
                            key: "region",
                            suffix: CaretDownFill
                        },
                        {
                            label: "Status",
                            value: "status",
                            key: "status",
                            suffix: CaretDownFill
                        }
                    ]
                }
            />
            <Button
                label="Sortby"
                prefix={ArrowsDownUp}
                variant={"basic"}
            />
            <ButtonGroup
                selectable
                value={"list"}
                items={
                    [
                        {
                            value: "list",
                            key: "list",
                            prefix: List
                        },
                        {
                            value: "grid",
                            key: "grid",
                            prefix: SquaresFour
                        }
                    ]
                }
            />
        </>
    }
}