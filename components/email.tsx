import React from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { isValidEmail } from "@/utils/mail";
type ColorType =
  | "default"
  | "success"
  | "danger"
  | "primary"
  | "secondary"
  | "warning";

export default function Email() {
  const defaultButtonMessage = "Sign up";
  const defaultButtonColor = "default";
  const [email, setEmail] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [buttonMessage, setButtonMessage] =
    React.useState(defaultButtonMessage);
  const [buttonColor, setButtonColor] =
    React.useState<ColorType>(defaultButtonColor);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [isInvalid, setIsInvalid] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setButtonMessage(defaultButtonMessage);
      setButtonColor(defaultButtonColor);
    }, 10_000);
  }, [defaultButtonColor, buttonMessage]);

  const validateEmail = () => {
    if (email === "") {
      setIsInvalid(true);
      setErrorMessage("Please, enter a valid email");
      return false;
    } else if (!isValidEmail(email)) {
      setIsInvalid(true);
      setErrorMessage("Please, enter an email");
      return false;
    } else {
      setIsInvalid(false);
      setErrorMessage("");
      return true;
    }
  };
  const handleOnBlur = () => {
    if (isInvalid) {
      validateEmail();
    }
  };
  const handleOnClick = async () => {
    if (!validateEmail()) {
      return;
    }
    try {
      setButtonLoading(true);
      const response = await fetch("/api/subscriber", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setButtonLoading(false);
      console.log(response);
      if (response.status == 201) {
        setButtonLoading(false);
        setButtonMessage("Success");
        setButtonColor("success");
      } else {
        setButtonMessage("Error");
        setButtonColor("danger");
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
        color={isInvalid ? "danger" : "default"}
        errorMessage={errorMessage}
        onBlur={handleOnBlur}
        onValueChange={setEmail}
        className="max-w-[220px]"
      />

      <Button
        color={buttonColor}
        size="md"
        isLoading={buttonLoading}
        onClick={handleOnClick}
      >
        {buttonMessage}
      </Button>
    </div>
  );
}
