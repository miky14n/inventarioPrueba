"use client";
//NextUI
import { Button } from "@nextui-org/react";

//React
import react from "react";

export default function NuxButton({
  content = "Button",
  size = "md",
  radius = "md",
  color = "primary",
  isLoading = false,
  startIcon = <></>,
  endIcon = <></>,
  classname = "",
  action = () => {
    console.log("Im doing something!");
  },
}) {
  /*
    NuxButton
    This is a simple Button, and makes something

    Inputs:
    size: sm, md, lg
    radius: full, sm, md, lg, none
    isLoading: true, false
    color: "nameColor"
    startIcon: <NameIcon/>
    endIcon: <NameIcon/>
    content: Text or Icon
    classname: TailWindCSS
    */

  const [isPressed, setIsPressed] = react.useState(false);

  const handlerAction = () => {
    setIsPressed(true);
    /*Something Happens*/
    console.log("It has been pressed!");
  };

  return (
    <Button
      size={size}
      radius={radius}
      color={color}
      isLoading={isLoading}
      startContent={startIcon}
      endContent={endIcon}
      classname={classname}
      onPress={action}
      isPressed={isPressed}
      onPressChange={handlerAction}
    >
      {content}
    </Button>
  );
}
