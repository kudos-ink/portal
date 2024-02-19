"use client";
import React from "react";
import { Input, InputProps } from "@nextui-org/input";
import { Button, ButtonProps } from "@nextui-org/button";
import isEmail from "is-email";
import { useForm } from "react-hook-form";

type ColorType =
  | "default"
  | "success"
  | "danger"
  | "primary"
  | "secondary"
  | "warning";

interface IEmailProps {
  buttonProps?: ButtonProps;
  inputProps?: InputProps;
}

const Email = ({ buttonProps, inputProps }: IEmailProps) => {
  const defaultButtonMessage = "Sign up";
  const defaultButtonColor = "default";
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [buttonMessage, setButtonMessage] =
    React.useState(defaultButtonMessage);
  const [buttonColor, setButtonColor] =
    React.useState<ColorType>(defaultButtonColor);

  React.useEffect(() => {
    setTimeout(() => {
      setButtonMessage(defaultButtonMessage);
      setButtonColor(defaultButtonColor);
    }, 10_000);
  }, [defaultButtonColor, buttonMessage]);

  const handleOnClick = async (data: any) => {
    await registerEmail(data.email);
  };

  const registerEmail = async (email: string) => {
    try {
      setIsLoading(true);
      // const csrfResp = await fetch("/csrf-token"); //TODO: disable until we fix the issue with the headers
      // const { csrfToken } = await csrfResp.json();
      const response = await fetch("/api/subscriber", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
          // "X-CSRF-Token": csrfToken,
        },
      });
      if (response.status == 201) {
        setButtonMessage("Success!");
        setButtonColor("success");
      } else {
        setButtonMessage("Error");
        setButtonColor("danger");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const emailIsInvalid = !!errors.email;
  return (
    <form
      className="flex flex-row gap-2"
      onSubmit={handleSubmit(handleOnClick)}
    >
      <Input
        value={email}
        type="email"
        variant="bordered"
        label="Type your email.."
        isInvalid={emailIsInvalid}
        color={emailIsInvalid ? "danger" : "default"}
        errorMessage={errors.email?.message?.toString()}
        onValueChange={setEmail}
        size="sm"
        {...register("email", {
          required: "Email is required",
          validate: {
            maxLength: (v) =>
              v.length <= 50 || "The email should have at most 50 characters",
            matchPattern: (v) =>
              isEmail(v) || "Email address must be a valid address",
          },
        })}
        {...inputProps}
      />
      <Button
        type="submit"
        color={buttonColor}
        isDisabled={emailIsInvalid}
        isLoading={isLoading}
        className="h-12"
        {...buttonProps}
      >
        {buttonMessage}
      </Button>
    </form>
  );
};
export default Email;
