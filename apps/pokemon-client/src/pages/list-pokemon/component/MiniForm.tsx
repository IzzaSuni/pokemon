import { FlexBox } from "@/src/components/core";
import { useState } from "react";
import { TextInput } from "../list.styled";
import { Button } from "@mui/material";
import { UilCheckCircle } from "@iconscout/react-unicons";

type Props = {
  submit: (nickname: string) => void;
  label: string;
};

export default function MiniForm({ submit, label }: Props) {
  const [nickname, setNickname] = useState("");

  return (
    <FlexBox width="100%" alignItems={"center"}>
      <TextInput
        size="small"
        label={label}
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
