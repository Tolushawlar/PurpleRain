# Purplerain HR CRM - Admin Panel

A comprehensive Human Resource CRM system for managing end-to-end hiring, onboarding, and documentation processes for interns and employees.

## 🚀 Features

### Admin Panel Components
- **Job Post Assignment** - Assign job posting tasks to HR interns
- **HR Flow Assignment** - Configure workflow stages and assign interns
- **Department Monitor Management** - Assign department monitors
- **All Intern Profiles Dashboard** - Comprehensive intern progress view

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom Purplerain theme
- **Icons**: Lucide React
- **Database**: Supabase (ready for integration)
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd purplerain-hr-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Color Palette
- **Primary**: #5D5FEF (Indigo Blue)
- **Accent**: #F97316 (Orange)
- **Background**: #F9FAFB
- **Card**: #FFFFFF
- **Border**: #E5E7EB
- **Success**: #10B981
- **Error**: #EF4444
- **Info**: #2563EB

### Components
- Reusable UI components (Button, Card, StatusBadge)
- Responsive layout with sidebar navigation
- Form validation and multi-select functionality
- Data tables with search and filtering

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx                    # Admin Dashboard
│   │   ├── job-assignment/page.tsx     # Job Assignment
│   │   ├── hr-flow/page.tsx           # HR Flow
│   │   ├── department-monitors/page.tsx # Department Monitors
│   │   └── intern-profiles/page.tsx    # Intern Profiles
├── components/
│   ├── admin/                         # Admin-specific components
│   ├── ui/                           # Reusable UI components
│   └── layout/                       # Layout components
├── data/                             # Mock data
├── lib/                              # Utilities and types
└── styles/
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📋 Admin Panel Features

### 1. Job Post Assignment
- Create job postings with title and description
- Select multiple platforms (LinkedIn, Indeed, etc.)
- Choose target countries
- Assign multiple HR interns
- Form validation and submission

### 2. HR Flow Assignment
- Visual workflow representation
- 8-stage process from job posting to Slack invitation
- Assign interns to each workflow stage
- Save and update flow configurations

### 3. Department Monitor Management
- Manage 6 departments (Social Media, Development, Design, Marketing, Content, Operations)
- Assign/reassign department monitors
- View department statistics and metrics
- Monitor performance tracking

### 4. Intern Profiles Dashboard
- Comprehensive intern data table
- Search and filter functionality
- Status tracking (Pending, In Progress, Completed)
- Document management
- Export capabilities
- Bulk actions

## 🔮 Future Enhancements

- Supabase database integration
- WhatsApp API notifications
- Real-time updates
- Advanced analytics
- Role-based permissions
- Document upload functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.