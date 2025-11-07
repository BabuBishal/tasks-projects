import { AddStudentFormProps } from "@/lib/@types/types";
import { programList } from "@/lib/constants";

export default function AddStudentForm({
  onSubmit,
  formData,
  formErrors,
  handleSubmit,
  handleChange,
  error,
}: AddStudentFormProps & { error: string }) {
  return (
    <form
      onSubmit={(e) => handleSubmit(e, onSubmit)}
      className="bg-background  border-border  p-8 rounded-lg shadow w-full max-w-sm mx-auto shadow-muted"
    >
      <h2 className="text-secondary text-xl font-semibold mb-6 text-center">
        Add Student
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-muted  bg-accent"
        />
        {formErrors.name && (
          <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-muted bg-accent"
        />
        {formErrors.email && (
          <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Roll No</label>
        <input
          type="text"
          name="rollNo"
          value={formData.rollNo}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-muted  bg-accent"
        />
        {formErrors.rollNo && (
          <p className="text-red-500 text-sm mt-1">{formErrors.rollNo}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Program</label>
        <select
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-muted bg-accent"
          value={formData.program}
          name="program"
          onChange={handleChange}
        >
          <option value="" disabled defaultValue={"Select an option"}>
            Select an option
          </option>
          {programList?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {formErrors.program && (
          <p className="text-red-500 text-sm mt-1">{formErrors.program}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Semester</label>
        <input
          type="text"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-muted  bg-accent"
        />
        {formErrors.semester && (
          <p className="text-red-500 text-sm mt-1">{formErrors.semester}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-muted  bg-accent"
        />
        {formErrors.phone && (
          <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-muted  bg-accent"
        />
        {formErrors.address && (
          <p className="text-error text-sm mt-1">{formErrors.address}</p>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <button
        type="submit"
        className="mt-5 w-full bg-primary text-background py-2 rounded hover:bg-secondary hover:shadow-sm hover:shadow-accent transition duration-200 ease cursor-pointer "
      >
        Add
      </button>
    </form>
  );
}
