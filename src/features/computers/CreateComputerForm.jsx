import { Controller, useForm } from "react-hook-form";

import ReactSelect from "react-select";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Form, { FormRow, Input, Label } from "../../ui/Form";

import { useCreateComputer } from "./useCreateComputer";
import { useUpdateComputer } from "./useUpdateComputer";

function CreateComputerForm({ computerToEdit = {}, onCloseModal }) {
  const defaultComputer = { name: "", availablePackage: [] };
  const { id: editId, ...editValues } = computerToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, setValue, getValues, control } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });
  const { isCreating, createComputer } = useCreateComputer();
  const { isUpdating, updateComputer } = useUpdateComputer();
  const isWorking = isCreating || isUpdating;

  let existingAvailablePackages = [];
  if (isEditSession) {
    existingAvailablePackages = editValues.availablePackage.map((item) => ({
      value: item,
      label: item,
    }));
    console.log(editValues);
    // setValue("availablePackage", existingAvailablePackages);
  }

  function onSubmit(data) {
    const selectedPackages = getValues(["availablePackage"])[0].map(
      (item) => item.value
    );

    if (isEditSession)
      updateComputer(
        {
          newComputer: { ...data, availablePackage: selectedPackages },
          id: editId,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    else {
      createComputer(
        {
          newComputer: { ...data, availablePackage: selectedPackages },
        },
        {
          onSuccess: () => {
            reset(defaultComputer);
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
        <Label>PC Name</Label>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          name="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        <Label>Test</Label>
        <Controller
          control={control}
          name="availablePackage"
          render={({ field }) => (
            <ReactSelect
              isDisabled={isWorking}
              isClearable
              isMulti
              required={true}
              {...field}
              options={[
                { value: "Reguler", label: "Reguler" },
                { value: "Paket Malam", label: "Paket Malam" },
              ]}
            />
          )}
        />
      </FormRow>

      <FormRow>
        <ButtonGroup>
          <Button
            variation="secondary"
            type="reset"
            disabled={isCreating}
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? "Save" : "Create"}
          </Button>
        </ButtonGroup>
      </FormRow>
    </Form>
  );
}

export default CreateComputerForm;
