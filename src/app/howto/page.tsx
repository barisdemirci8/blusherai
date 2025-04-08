const faqs = [
  {
    id: "faq-1",
    question: "What is this service?",
    answer:
      "This is a web-based image inpainting tool. You can upload an image, mask the area you want changed or filled in, and generate a new version using AI.",
  },
  {
    id: "faq-2",
    question: "Do I need an account to use the service?",
    answer:
      "Yes, you need to be signed up and logged in to access the inpainting features. Creating an account is quick and free.",
  },
  {
    id: "faq-3",
    question: "How do credits work?",
    answer:
      "Credits are used for image generations. One generation costs 6 credits. You receive 18 free credits every day, and you can purchase additional credits anytime from the pricing page.",
  },
  {
    id: "faq-4",
    question: "Are credits charged if the generation fails?",
    answer:
      "No — credits are only deducted when the image is successfully generated. If there's an error, your credits remain untouched.",
  },
  {
    id: "faq-5",
    question: "How can I get more credits?",
    answer:
      "You can purchase credit packages from the pricing page. Packages range from small bundles to larger packs with bonus credits. All purchased credits never expire.",
  },
  {
    id: "faq-6",
    question: "What kind of prompt should I use for inpainting?",
    answer:
      "Inpainting prompts work best when they clearly describe what should appear in the **masked area** of the image, rather than a generic image description. For example, say 'replace the masked area with a sunny beach background' instead of 'a tropical landscape'. Focus on what goes in the hole!",
  },
  {
    id: "faq-7",
    question: "Can I use typical image generation prompts?",
    answer:
      "Not exactly. Inpainting is context-aware — it looks at the existing image and your masked area. Prompts like 'a futuristic city' are too broad. Instead, say something like 'a futuristic building that fits with the skyline' to guide the model more effectively.",
  },
  {
    id: "faq-8",
    question: "Do my credits expire?",
    answer:
      "No, credits you purchase never expire. You can use them whenever you like. Your 18 daily free credits refresh every 24 hours and don't stack.",
  },
];

export default async function HowToPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="mx-auto max-w-[80%]">
        <h2 className="text-2xl font-semibold tracking-tight text-primary sm:text-5xl">
          Frequently asked questions
        </h2>
        <dl className="mt-20 divide-y divide-gray-900/10">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8"
            >
              <dt className="text-base/7 font-semibold text-primary lg:col-span-5">
                {faq.question}
              </dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base/7 text-gray-600">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
