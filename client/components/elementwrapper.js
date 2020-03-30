import React from "react";

const SSR = props => {
  return props.children;
};

let Alert = SSR;
let Button = SSR;
let Card = SSR;
let Layout = SSR;
let Loading = SSR;
let Message = SSR;
let MessageBox = SSR;
let Notification = SSR;
let Radio = SSR;
let Dialog = SSR;
let Rate = SSR;
let Progress = SSR;
let Badge = SSR;
let Tabs = SSR;
let Tree = SSR;
let Input = SSR;
let Icon = SSR;
let Menu = SSR;
let Steps = SSR;
let Breadcrumb = SSR;
let Tooltip = SSR;
let InputNumber = SSR;
let Checkbox = SSR;
let Slider = SSR;
let Table = SSR;
let Switch = SSR;
let Form = SSR;
let Upload = SSR;
let Tag = SSR;
let Select = SSR;
let Dropdown = SSR;
let Popover = SSR;
let Pagination = SSR;
let AutoComplete = SSR;
let TimeSelect = SSR;
let TimePicker = SSR;
let TimeRangePicker = SSR;
let DatePicker = SSR;
let DateRangePicker = SSR;
let Carousel = SSR;
let Collapse = SSR;
let ColorPicker = SSR;
let Cascader = SSR;
let Transfer = SSR;
// required
if (typeof window !== `undefined`) {
  Loading = require("element-react/dist/npm/es6/src/loading").default;
  Table = require("element-react/dist/npm/es6/src/table").default;
  Pagination = require("element-react/dist/npm/es6/src/pagination").default;
}

export {
  Alert,
  Button,
  Card,
  Layout,
  Loading,
  Message,
  MessageBox,
  Notification,
  Radio,
  Dialog,
  Rate,
  Progress,
  Badge,
  Tabs,
  Tree,
  Input,
  Icon,
  Menu,
  Steps,
  Breadcrumb,
  Tooltip,
  InputNumber,
  Checkbox,
  Slider,
  Table,
  Switch,
  Form,
  Upload,
  Tag,
  Select,
  Dropdown,
  Popover,
  Pagination,
  AutoComplete,
  TimeSelect,
  TimePicker,
  TimeRangePicker,
  DatePicker,
  DateRangePicker,
  Carousel,
  Collapse,
  ColorPicker,
  Cascader,
  Transfer
};
