"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  // const handleGoogleLogin = async () => {
  //   const data = authClient.signIn.social({
  //     provider: "google",
  //     callbackURL: process.env.NEXT_PUBLIC_FRONTEND_URL!,
  //   });
  // };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating user...");
      try {
        const { data, error } = await authClient.signUp.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Created Successfully!", { id: toastId });

        router.push("/login");
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  return (
    <Card
      {...props}
      className="w-full rounded-lg shadow-lg border border-border bg-card text-card-foreground"
    >
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl md:text-3xl">
          Create an account
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="signup-form"
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-1">
            {/* Name */}
            <form.Field
              name="name"
              children={(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Email */}
            <form.Field
              name="email"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Password */}
            <form.Field
              name="password"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                    minLength={8}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Role */}
            <form.Field
              name="role"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(val) => field.handleChange(val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CUSTOMER">Customer</SelectItem>
                      <SelectItem value="PROVIDER">Provider</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 md:gap-4">
        <Button
          form="signup-form"
          type="submit"
          className="w-full md:w-full bg-orange-500 cursor-pointer"
        >
          Register
        </Button>

        {/* <Button
          onClick={handleGoogleLogin}
          variant="outline"
          type="button"
          className="w-full md:w-full cursor-pointer"
        >
          Continue with Google
        </Button> */}
      </CardFooter>
    </Card>
  );
}