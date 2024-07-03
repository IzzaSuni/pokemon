import { FlexBox } from "@/src/components/core";
import { useState } from "react";
import { TextInput } from "../listStyled";
import { Button } from "@mui/material";
import { UilCheckCircle } from "@iconscout/react-unicons";

export default function MiniForm({
  submit,
}: {
  submit: (nickname: string) => void;
}) {
  const [nickname, setNickname] = useState("");

  return (
    <FlexBox width="100%" alignItems={"center"}>
      <TextInput
        size="small"
        label="give a nickname"
        onChange={({ target }) => setNickname(target?.value)}
      />
      <Button
        onClick={() => {
          submit(nickname);
        }}
      >
        <UilCheckCircle color="green" />
      </Button>
    </FlexBox>
  );
}
