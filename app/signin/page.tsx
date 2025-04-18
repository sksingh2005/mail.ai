import SignInForm from "@/components/Signinform";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Header */}
        
        <SignInForm />
      </div>
    </div>
  );
}