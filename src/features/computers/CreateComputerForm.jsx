import { Controller, useForm } from "react-hook-form";

import ReactSelect from "react-select";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Form, { FormRow, Input, Label } from "../../ui/Form";

import { useCreateComputer } from "./useCreateComputer";
import { useUpdateComputer } from "./useUpdateComputer";
import usePackages from "../packages/usePackages";
import Spinner from "../../ui/Spinner";

function CreateComputerForm({ computerToEdit = {}, onCloseModal }) {
  const defaultComputer = { name: "" };
  const { id: editId, ...editValues } = computerToEdit;
  const isEditSession = Boolean(editId);

  // IF edit session, populate package to fill multiselect
  if (isEditSession) {
    editValues.packages = editValues.packages.map((item) => ({
      id: item.id,
      value: item.name,
      label: item.name,
    }));
  }

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: isEditSession ? editValues : defaultComputer,
  });

  const { isLoading: isLoadingPackage, packages } = usePackages();
  const { isCreating, createComputer } = useCreateComputer();
  const { isUpdating, updateComputer } = useUpdateComputer();
  const isWorking = isCreating || isUpdating;

  if (isLoadingPackage) return <Spinner />;

  const availablePackages = packages.map((item) => ({
    id: item.id,
    value: item.name,
    label: item.name,
  }));

  function onSubmit(data) {
    if (isEditSession)
      updateComputer(
        {
          newComputer: { ...data },
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
          newComputer: { ...data },
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
        <Label>Package List</Label>
        <Controller
          control={control}
          name="packages"
          render={({ field: { value, onChange } }) => (
            <ReactSelect
              closeMenuOnSelect={false}
              isDisabled={isWorking}
              isClearable
              isMulti
              required={true}
              options={availablePackages}
              onChange={(value) => onChange(value.sort((a, b) => b.id - a.id))}
              value={value}
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
