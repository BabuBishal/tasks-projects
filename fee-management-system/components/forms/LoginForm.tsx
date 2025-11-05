import { LoginFormProps } from "@/lib/@types/types";
import Link from "next/link";

export default function LoginForm({
  onSubmit,
  formData,
  formErrors,
  handleSubmit,
  handleChange,
  error,
}: LoginFormProps & { error: string }) {
  return (
    <form
      onSubmit={(e) => handleSubmit(e, onSubmit)}
      className="bg-background  border-border  p-8 rounded-lg shadow w-full max-w-sm mx-auto shadow-muted"
    >
      <h2 className="text-secondary text-xl font-semibold mb-6 text-center">
        Login
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-muted  bg-accent"
        />
        {formErrors.email && (
          <p className="text-error text-sm mt-1">{formErrors.email}</p>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-muted bg-accent"
        />
        {formErrors.password && (
          <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <button
        type="submit"
        className="mt-5 w-full bg-primary text-background py-2 rounded hover:bg-secondary hover:shadow-sm hover:shadow-accent transition duration-200 ease cursor-pointer "
      >
        Login
      </button>
      <div className="mt-4 flex gap-3 justify-center items-center">
        <span className="text-xs text-muted">Don't have an account? </span>{" "}
        <Link
          href={`/register`}
          className="text-xs font-semibold text-secondary underline"
        >
          Register
        </Link>
      </div>{" "}
    </form>
  );
}
