-- Create departments table
create table if not exists departments (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text not null,
    icon text not null,
    is_ai_generated boolean default false,
    ai_generation_prompt text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table departments enable row level security;

create policy "Departments are viewable by everyone"
    on departments for select
    using (true);

-- Create updated_at trigger
create or replace function handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger set_updated_at
    before update on departments
    for each row
    execute function handle_updated_at();

-- Insert initial departments
insert into departments (name, description, icon, is_ai_generated) values
    ('Sales', 'Sales, Business Development, Account Management', 'briefcase', false),
    ('Marketing', 'Digital Marketing, Content, Social Media', 'gears', false),
    ('Customer Service', 'Customer Support, Success, and Experience', 'users', false),
    ('Administration', 'HR, Finance, Operations, Executive', 'users', false),
    ('Engineering', 'Software Development, DevOps, QA', 'gears', false),
    ('Product', 'Product Management, Design, UX', 'gears', false),
    ('Operations', 'Business Operations, Strategy, Analytics', 'briefcase', false),
    ('Finance', 'Accounting, Financial Planning, Analysis', 'briefcase', false),
    ('Legal', 'Legal Counsel, Compliance, Risk Management', 'briefcase', false);

-- Create indexes
create index departments_name_idx on departments (name);
create index departments_created_at_idx on departments (created_at);
create index departments_is_ai_generated_idx on departments (is_ai_generated); 