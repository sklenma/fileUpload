import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import {
  Controller,
  FieldValues,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type FormValues = {
  firstName: string;
  profilePicture: File;
  title: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? {
          firstName: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

export function UploadPage() {
  const { control, register, handleSubmit } = useForm<FormValues>({ resolver });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post("http://localhost:8000/postData", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="First name"
        {...register("firstName", { required: true, maxLength: 80 })}
      />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input
          id="picture"
          type="file"
          {...register("profilePicture", { required: true })}
        />
      </div>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <Select onValueChange={onChange} defaultValue={value}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <Button variant="secondary" type="submit">
        Secondary
      </Button>
    </form>
  );
}
