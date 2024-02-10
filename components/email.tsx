import React from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { isValidEmail } from "@/utils/mail";

export default function Email() {
  const [email, setEmail] = React.useState("");
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [isInvalid, setIsInvalid] = React.useState(false);

  const handleOnClick = async () => {
    if (email === "" || !isValidEmail(email)) {
      setIsInvalid(true);
      return;
    }
    try {
      setButtonLoading(true);
      const response = await fetch("/api/subscriber", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      if (response.status == 201) {
        console.log("added");
        setButtonLoading(false);
      } else {
        console.log("not added");
      }
    } catch (e) {
      setButtonLoading(false);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div className="flex flex-row gap-2">
      <Input
        value={email}
        size="sm"
        type="email"
        variant="bordered"
        label="Enter your email"
        isInvalid={isInvalid}
        // color={isInvalid ? "danger" : "primary"}
        errorMessage={isInvalid && "Please enter a valid email"}
        onValueChange={setEmail}
        // className="max-w-xs"
      />

      <Button
        color="primary"
        size="md"
        isLoading={buttonLoading}
        onClick={handleOnClick}
        // isDisabled={buttonDisabled}
      >
        Sing up
      </Button>
    </div>
  );
}
