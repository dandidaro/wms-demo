import { Controller, useForm } from "react-hook-form";

import { useCreatePackage } from "./useCreatePackage";
import { useUpdatePackage } from "./useUpdatePackage";

import ReactSelect from "react-select";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Form, { Error, FormRow, Input, Label } from "../../ui/Form";
import {
  daysIndonesia,
  formatCurrency,
  setDayIndex,
} from "../../utils/helpers";

function CreatePackageForm({ packageToEdit = {}, onCloseModal }) {
  const days = daysIndonesia;
  const daysName = days.map((day, index) => ({
    index: index,
    value: day,
    label: day,
  }));

  const defaultPackage = { name: "", dayAvailable: null };

  const { id: editId, ...editValues } = packageToEdit;
  const isEditSession = Boolean(editId);

  if (isEditSession) {
    editValues.dayAvailable = editValues.dayAvailable.map((day) => ({
      index: setDayIndex(day),
      value: day,
      label: day,
    }));
  }

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : defaultPackage,
  });

  console.log(errors);

  const { isCreating, createPackage } = useCreatePackage();
  const { isUpdating, updatePackage } = useUpdatePackage();
  const isWorking = isCreating || isUpdating;

  function onSubmit(data) {
    const standarizeDays = data.dayAvailable.map((item) => item.value);

    if (isEditSession)
      updatePackage(
        {
          newPackage: { ...data, dayAvailable: standarizeDays },
          id: editId,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    else {
      createPackage(
        {
          newPackage: { ...data, dayAvailable: standarizeDays },
        },
        {
          onSuccess: () => {
            reset(defaultPackage);
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow>
        <Label>Package Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          disabled={isWorking}
          required={true}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        <Label>Price (Rp)</Label>
        <Input
          type="number"
          id="price"
          name="price"
          disabled={isWorking}
          required={true}
          {...register("price", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Label>Available Day List</Label>
        <Controller
          control={control}
          name="dayAvailable"
          disabled={isWorking}
          render={({ field: { value, onChange } }) => (
            <ReactSelect
              closeMenuOnSelect={false}
              isClearable
              isMulti
              required={true}
              options={daysName}
              onChange={(value) =>
                onChange(value.sort((a, b) => a.index - b.index))
              }
              value={value}
            />
          )}
        />
      </FormRow>

      <FormRow>
        <Label>Min Duration (Hours)</Label>
        <Input
          type="number"
          id="minHourDuration"
          name="minHourDuration"
          disabled={isWorking}
          required={true}
          {...register("minHourDuration", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum duration hour is 1 hour",
            },
            max: {
              value: 24,
              message: "Maximum duration hour is 24 hours",
            },
          })}
        />
        <div></div>
        {errors?.minHourDuration?.message && (
          <Error>{errors.minHourDuration.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <ButtonGroup>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button>{isEditSession ? "Save" : "Create"}</Button>
        </ButtonGroup>
      </FormRow>
    </Form>
  );
}

export default CreatePackageForm;
