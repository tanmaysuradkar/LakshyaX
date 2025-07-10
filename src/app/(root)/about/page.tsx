import Navbar from '@/app/components/Navbar';


export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">About LakshyaX</h1>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                At LakshyaX, we&apos;re dedicated to revolutionizing remote team management by providing 
                innovative solutions that empower businesses to thrive in the digital age. Our mission 
                is to make remote work seamless, efficient, and productive for companies of all sizes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-gray-600">
                Founded in 2023, LakshyaX emerged from a simple observation: remote work was becoming 
                the new normal, but the tools to manage remote teams effectively were lacking. We set 
                out to create a comprehensive platform that would address the unique challenges of 
                remote team management.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-gray-600">Constantly pushing boundaries to create better solutions.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
                  <p className="text-gray-600">Putting our customers&apos; needs at the heart of everything we do.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                  <p className="text-gray-600">Striving for the highest quality in all our products and services.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
                  <p className="text-gray-600">Working together to achieve common goals and success.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
} 