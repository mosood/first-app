import ProfileSetup from '../components/profile/ProfileSetup';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Profile Setup</h1>
          <p className="mt-2 text-sm text-gray-600">
            Let's get to know you better to create your personalized workout plan.
          </p>
        </div>
      </div>
      <ProfileSetup />
    </div>
  );
} 