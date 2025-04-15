# Yardstick - Personal Finance Tracker

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kowshikvarma45/yardstick.git
   cd yardstick
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with:
   ```env
   NEXTAUTH_SECRET=your_secure_random_string_here
   NEXTAUTH_URL=http://localhost:3000
   MONGO_URI=mongodb+srv://your_mongodb_connection_string
   ```
   Generate NEXTAUTH_SECRET with:
   ```bash
   openssl rand -base64 32
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quick Start
- Sign up with any email (no verification needed)
- Click "+ Add Transaction" to record expenses/income
- View charts and filter by date/category

### Deployment
1. Push code to GitHub
2. Create Vercel project and connect repo
3. Add these environment variables:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production URL)
   - `MONGO_URI`
4. Deploy!

### Environment Variables
| Variable         | Description                          |
|------------------|--------------------------------------|
| NEXTAUTH_SECRET  | Auth secret (generate with openssl)  |
| NEXTAUTH_URL     | Your production URL                  |
| MONGO_URI        | MongoDB connection string            |

### Troubleshooting
If you see auth errors:
1. Verify all environment variables
2. Check MongoDB connection
3. Ensure NEXTAUTH_URL matches production URL exactly
4. Check Vercel deployment logs

### Tech Stack
- Next.js (App Router)
- NextAuth.js
- MongoDB
- Recharts
- Tailwind CSS

---

Happy budgeting! 💰📊
```

This maintains:
1. Your exact preferred format
2. All technical details from before
3. Clean markdown structure
4. No unnecessary sections
5. Straightforward instructions

Let me know if you'd like any adjustments to this format!
