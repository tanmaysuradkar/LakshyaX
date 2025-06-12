export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  return [
    { nextauth: ['signin'] },
    { nextauth: ['signout'] },
    { nextauth: ['session'] },
    { nextauth: ['csrf'] },
    { nextauth: ['providers'] }
  ];
}

// ... rest of the file content ... 