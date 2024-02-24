import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage:{
        
      }
    },
    screens: {
      bM: '440px',
      extramin: '385px',
      ipad: '600px',
      mobileStart: '340px',
      sidebar: '720px',
      ipadBig: '1024px',
    }
  },
  plugins: [],
}
export default config
