import Link from "next/link";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { LoginFormData } from "@/lib/schemas/auth.schema";

interface LoginFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  error: string;
  isLoading?: boolean;
}

export default function LoginForm({
  onSubmit,
  register,
  errors,
  error,
  isLoading,
}: LoginFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-background border-border p-8 rounded-lg shadow w-full max-w-sm mx-auto shadow-muted"
    >
      <h2 className="text-secondary text-xl font-semibold mb-6 text-center">
        Login
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-muted bg-accent"
        />
        {errors.email && (
          <p className="text-error text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-muted bg-accent"
        />
        {errors.password && (
          <p className="text-error text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      {error && <p className="text-error text-sm mt-1">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-5 w-full bg-primary text-background py-2 rounded hover:bg-secondary hover:shadow-sm hover:shadow-accent transition duration-200 ease cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
      <div className="mt-4 flex gap-3 justify-center items-center">
        <span className="text-xs text-muted">{`Don't have an account?`}</span>
        <Link
          href={`/register`}
          className="text-xs font-semibold text-secondary underline"
        >
          Register
        </Link>
      </div>
    </form>
  );
}
