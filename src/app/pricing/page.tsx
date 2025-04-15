import { Button } from "@/components/ui/button";

const packages = [
  {
    id: "starter",
    name: "Starter",
    price: 2,
    credits: 50,
    description: "Perfect for beginners",
  },
  {
    id: "creator",
    name: "Creator",
    price: 5,
    credits: 250,
    description: "Great for casual creators",
  },
  {
    id: "pro",
    name: "Pro",
    price: 10,
    credits: 500,
    description: "Ideal for professionals",
  },
  {
    id: "studio",
    name: "Studio",
    price: 20,
    credits: 1000,
    description: "For serious content creators",
  },
];

export default async function PricingPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mt-1 text-3xl font-semibold text-primary sm:text-5xl sm:tracking-tight lg:text-6xl">
            Choose your plan
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Generate stunning images with our AI-powered platform. Select the
            package that works for you.
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-auto xl:grid-cols-4">
          {packages.map((pkg) => (
            <form
              action={`/api/checkout?type=${pkg.id}`}
              method="POST"
              key={pkg.name}
              className="border border-gray-200 rounded-lg shadow-sm bg-white hover:scale-[1.1] transition ease-in-out"
            >
              <div className="p-6">
                <h2 className="text-lg leading-6 font-medium text-primary">
                  {pkg.name}
                </h2>
                <p className="mt-4 text-sm text-gray-500">{pkg.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${pkg.price}
                  </span>
                </p>
                <p className="mt-2 text-sm text-bg2 font-semibold">
                  {pkg.credits} credits included
                </p>
                <Button
                  //href="#"
                  className="cursor-pointer mt-8 block w-full border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-bg2"
                >
                  Buy {pkg.name} Pack
                </Button>
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
