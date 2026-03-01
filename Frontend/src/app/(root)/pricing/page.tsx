import Navbar from '@/app/components/Navbar';
import CTA from '@/app/components/CTA';
export default function Pricing() {
  const plans = [
    {
      name: 'Basic',
      price: '$29',
      description: 'Perfect for small teams getting started',
      features: [
        'Up to 5 team members',
        'Basic analytics',
        '24/7 support',
        '1GB storage',
        'Basic integrations',
        'Email support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$79',
      description: 'Best for growing businesses',
      features: [
        'Up to 20 team members',
        'Advanced analytics',
        'Priority support',
        '10GB storage',
        'Advanced integrations',
        'Phone & email support',
        'Custom reports',
        'Team management',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations with specific needs',
      features: [
        'Unlimited team members',
        'Custom analytics',
        'Dedicated support',
        'Unlimited storage',
        'Custom integrations',
        '24/7 phone support',
        'Custom reporting',
        'Advanced security',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Choose the perfect plan for your team&apos;s needs
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-lg shadow-sm ${
                  plan.popular ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 -mt-4 -mr-4">
                    <span className="inline-flex rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                  <p className="mt-4 text-gray-500">{plan.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    {plan.price !== 'Custom' && (
                      <span className="text-base font-medium text-gray-500">/month</span>
                    )}
                  </p>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-6 w-6 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-500">{feature}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <button
                      className={`w-full px-4 py-2 rounded-md text-sm font-medium ${
                        plan.popular
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              {[
                {
                  question: 'Can I change plans later?',
                  answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
                },
                {
                  question: 'What payment methods do you accept?',
                  answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.',
                },
                {
                  question: 'Is there a free trial?',
                  answer: 'Yes, we offer a 14-day free trial on our Pro plan. No credit card required.',
                },
                {
                  question: 'Do you offer discounts for non-profits?',
                  answer: 'Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information.',
                },
              ].map((faq) => (
                <div key={faq.question} className="pt-6">
                  <dt className="text-lg font-medium text-gray-900">{faq.question}</dt>
                  <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTA/>
    </main>
  );
} 