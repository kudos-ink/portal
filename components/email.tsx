"use client";
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

const Email = () => {
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
  const handleOnChange = () => {
    if (isInvalid) {
      validateEmail();
    }
  };

  const handleKeyDown = async (event: { key: string }) => {
    if (event.key === "Enter") {
      await registerEmail();
    }
  };
  const handleOnClick = async () => {
    await registerEmail();
  };

  const registerEmail = async () => {
    if (!validateEmail()) {
      return;
    }
    try {
      setButtonLoading(true);
      const csrfResp = await fetch("/csrf-token");
      const { csrfToken } = await csrfResp.json();

      const response = await fetch("/api/subscriber", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });
      setButtonLoading(false);
      if (response.status == 201) {
        setButtonLoading(false);
        setButtonMessage("Success!");
        setButtonColor("success");
      } else {
        setButtonMessage("Error");
        setButtonColor("danger");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div className="flex flex-row gap-2">
      <Input
        value={email}
        type="email"
        variant="bordered"
        label="Enter your email"
        isInvalid={isInvalid}
        color={isInvalid ? "danger" : "default"}
        errorMessage={errorMessage}
        onChange={handleOnChange}
        onValueChange={setEmail}
        onKeyDown={handleKeyDown}
        className="h-24"
      />

      <Button
        color={buttonColor}
        isLoading={buttonLoading}
        onClick={handleOnClick}
        className="h-14"
      >
        {buttonMessage}
      </Button>
    </div>
  );
};
export default Email;
