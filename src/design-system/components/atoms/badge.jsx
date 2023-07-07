import PropTypes from "prop-types"
import { cn } from "../utils"

export const Badge = ({ type, label, icon }) => {
  let Icon = icon
  return (
    <div className={cn("flex gap-1 items-center  h-5 py-0.5 px-2 w-fit rounded-full bodySm border select-none", {
      "border-border-default bg-surface-default text-text-default": type === "neutral",
      "border-border-primary bg-surface-primary-subdued text-text-primary": type === "info",
      "border-border-success bg-surface-success-subdued text-text-success": type === "success",
      "border-border-warning bg-surface-warning-subdued text-text-warning": type === "warning",
      "border-border-critical bg-surface-critical-subdued text-text-critical": type === "danger",
    })}>{icon && <Icon size={12} color="currentColor" />}{label}</div>
  )
}


Badge.propTypes = {
  type: PropTypes.oneOf(["neutral", "info", "success", "warning", "danger"]),
  label: PropTypes.string.isRequired,
  icon: PropTypes.object
}


Badge.defaultProps = {
  type: "neutral",
  label: "badge"
}