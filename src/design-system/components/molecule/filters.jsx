import { Search, SearchFill } from "@jengaicons/react"
import PropTypes from 'prop-types';
import { createRef, useRef, useState } from "react";
import Toolbar from "../atoms/toolbar";
import ChipGroup from "../atoms/chip-group"
import OptionList from "../atoms/option-list";
import { Button } from "../atoms/button";
import ButtonGroup from "../atoms/button-group";




export const Filters = ({ onFilterTextChange, filterActions }) => {
    const [chips, setChips] = useState([
        { label: "hello", type: ChipGroup.ChipType.REMOVABLE, id: 0 },
        { label: "hi", type: ChipGroup.ChipType.REMOVABLE, id: 1 },
        { label: "apple", type: ChipGroup.ChipType.REMOVABLE, id: 2 },
        { label: "ball", type: ChipGroup.ChipType.CLICKABLE, id: 3 },
    ])
    return <div className="flex flex-row items-center gap-2 w-full flex-wrap">

        {filterActions && filterActions}

        {/* <ToastProvider>
            <Toast show />
            <Toast show />
            <Toast show />
        </ToastProvider> */}

        <div>
            <Toolbar>
                <Toolbar.TextInput placeholder="Filter" prefixIcon={Search} />
                <Toolbar.ButtonGroup value={"hello"} selectable>
                    <Toolbar.ButtonGroup.Button content={"hello"} value={"hello"} />
                    <Toolbar.ButtonGroup.Button content={"hi"} value={"hi"} />
                    <OptionList>
                        <OptionList.Trigger>
                            <Toolbar.ButtonGroup.Button content={"hwllo world"} />
                        </OptionList.Trigger>
                        <OptionList.Content>
                            <OptionList.CheckboxItem>
                                hello
                            </OptionList.CheckboxItem>
                        </OptionList.Content>
                    </OptionList>
                </Toolbar.ButtonGroup>
            </Toolbar>
        </div>

        <div>
            <ChipGroup onRemove={(e) => {
                setChips(chips.filter((c) => c.id != e))
            }}>
                {chips.map((chip, index) => <ChipGroup.Chip key={index} id={chip.id} label={chip.label} type={chip.type} />)}
            </ChipGroup>
        </div>

        <ButtonGroup>
            <ButtonGroup.Button content={"hello"} />
            <ButtonGroup.Button content={"hello"} />
            <OptionList>
                <OptionList.Trigger>
                    <ButtonGroup.Button content={"hwllo world"} />
                </OptionList.Trigger>
                <OptionList.Content>
                    <OptionList.CheckboxItem>
                        hello
                    </OptionList.CheckboxItem>
                </OptionList.Content>
            </OptionList>
        </ButtonGroup>
    </div>
}


Filters.propTypes = {
    onFilterTextChange: PropTypes.func,
    filterActions: PropTypes.element,
}
