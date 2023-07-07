import { Search, SearchFill } from "@jengaicons/react"
import { Abc, TextInput } from "../atoms/input"
import PropTypes from 'prop-types';
import { createRef, useRef, useState } from "react";
import {
    Toolbar,
    ToolbarButton,
    ToolbarTextField,
    ToolbarToggleButton,
    ToolbarToggleGroup,
    ToolbarToggleIconButton
} from "../atoms/toolbar"


export const Filters = ({ onFilterTextChange, filterActions }) => {

    const [selected, setSelected] = useState("hi")
    const [helloWorld, setHelloworld] = useState(true)
    let ref = useRef(null)
    return <div className="flex flex-row items-center gap-2 w-full flex-wrap">
        <TextInput
            placeholder={'Filters'}
            prefixIcon={Search}
            onChange={onFilterTextChange}
            className={'flex-1 min-w-32'}

        />

        {filterActions && filterActions}
        {/* <ToggleGroup value={"left"}>
            <ToggleGroup.Button content={"Hello world"} value={"left"} />
            <ToggleGroup.Button content={"Hello world"} value={"right"} />
        </ToggleGroup>

        <OptionListGroup>
            <OptionList
                trigger={<Button variant="outline" content="Menu" />}
                filter
                onFilterChange={(e) => { console.log(e) }}
            >
                <OptionList.CheckboxItem checked={helloWorld} onValueChange={setHelloworld}>
                    Hello world
                </OptionList.CheckboxItem>
                <OptionList.Separator />
                <OptionList.RadioGroup value={selected} onValueChange={setSelected}>
                    <OptionList.RadioGroupItem value="hello">
                        Hello
                    </OptionList.RadioGroupItem>
                    <OptionList.RadioGroupItem value="hi">
                        Hi
                    </OptionList.RadioGroupItem>
                </OptionList.RadioGroup>
            </OptionList>
            <OptionList
                trigger={<Button variant="outline" content="Menu" />}
            >
                <OptionList.CheckboxItem>
                    Hello world
                </OptionList.CheckboxItem>
                <OptionList.Separator />
                <OptionList.RadioGroup value="hi">
                    <OptionList.RadioGroupItem value="hello">
                        Hello
                    </OptionList.RadioGroupItem>
                    <OptionList.RadioGroupItem value="hi">
                        Hi
                    </OptionList.RadioGroupItem>
                </OptionList.RadioGroup>
            </OptionList>
        </OptionListGroup>

        <OptionList
            trigger={<Button variant="outline" content="Menu" />}
        >
            <OptionList.CheckboxItem>
                Hello world
            </OptionList.CheckboxItem>
            <OptionList.Separator />
            <OptionList.RadioGroup value="hi">
                <OptionList.RadioGroupItem value="hello">
                    Hello
                </OptionList.RadioGroupItem>
                <OptionList.RadioGroupItem value="hi">
                    Hi
                </OptionList.RadioGroupItem>
            </OptionList.RadioGroup>
        </OptionList>

        <ToastProvider>
            <Toast show />
            <Toast show />
            <Toast show />
        </ToastProvider> */}

        {/* <Popover /> */}

        <div>
            <Toolbar>
                <ToolbarTextField placeholder={"Hello"} prefixIcon={Search} />
                <ToolbarToggleGroup type={"single"} value={"hi"} onClick={(e) => { console.log(e); }}>
                    <ToolbarToggleButton value={"hi"} content="hi" />
                    <ToolbarToggleButton value={"hi1"} content="hi1" />
                    <ToolbarToggleButton value={"hi2"} content="hi2" />
                    <ToolbarToggleIconButton value={"hi3"} icon={SearchFill} />
                </ToolbarToggleGroup>
                <ToolbarButton />
            </Toolbar>
        </div>

    </div>
}


Filters.propTypes = {
    onFilterTextChange: PropTypes.func,
    filterActions: PropTypes.element,
}
