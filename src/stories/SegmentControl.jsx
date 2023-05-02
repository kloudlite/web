import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";
import BounceIt from "../components/bounce-it.jsx";
import {Button} from "./Button.jsx";

/**
 * Button component for user interaction
 */
export const SegmentControl = ({items, size, value, onChange, style }) => {
  return (
    <div className={"flex flex-row"}>
      {items.map((item, index) => {
        // if not first item then add property sharpRight and if not last item then add property sharpLeft
        const sharpRight = index !== 0;
        const sharpLeft = index !== items.length - 1;
        return <Button nobounce key={item.value} size={size} label={item.label} style={
          item.value === value ? style : "basic"
        } onClick={()=>{
          onChange(item.value)
        }} sharpRight={sharpRight} sharpLeft={sharpLeft}/>
      })}
    </div>
  );
};

SegmentControl.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.oneOf(["primary", "secondary", "critical"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

SegmentControl.defaultProps = {
  style: 'primary',
  size: 'medium',
  onChange: () => {},
  value: "test",
  items: [
    {
      label: "test",
      value: "test",
    },
    {
      label: "test2",
      value: "test2",
    },
    {
      label: "test3",
      value: "test3",
    }
  ],
};