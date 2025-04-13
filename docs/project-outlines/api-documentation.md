# 🔌 ScaleMate API Documentation

**Version**: v1.0.0  
**Last Updated**: 2024-04-08

## 📋 Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
4. [Request & Response Formats](#request--response-formats)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [Webhooks](#webhooks)
8. [SDKs & Libraries](#sdks--libraries)
9. [Examples](#examples)
10. [Related Documents](#related-documents)

## 📝 Overview

The ScaleMate API provides programmatic access to ScaleMate's platform features, allowing developers to integrate ScaleMate functionality into their own applications. This document outlines the available endpoints, authentication methods, request/response formats, and best practices for API usage.

### Base URL

```
https://api.scalemate.dev/v1
```

### API Versioning

The API uses URL versioning (e.g., `/v1/`). Breaking changes will be released in new versions, with advance notice provided to developers.

## 🔐 Authentication

All API requests require authentication using JWT tokens.

### Obtaining a Token

```http
POST /auth/token
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password"
}
```

### Response

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

### Using the Token

Include the token in the Authorization header of all API requests:

```http
GET /users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Refreshing a Token

```http
POST /auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🔗 API Endpoints

### Users

#### Get Current User

```http
GET /users/me
```

Returns the currently authenticated user.

#### Update User

```http
PATCH /users/me
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com"
}
```

Updates the current user's information.

### Teams

#### List Teams

```http
GET /teams
```

Returns a list of teams the current user is a member of.

#### Create Team

```http
POST /teams
Content-Type: application/json

{
  "name": "My Team",
  "description": "A team for my project"
}
```

Creates a new team.

#### Get Team

```http
GET /teams/{team_id}
```

Returns details for a specific team.

#### Update Team

```http
PATCH /teams/{team_id}
Content-Type: application/json

{
  "name": "Updated Team Name",
  "description": "Updated description"
}
```

Updates a team's information.

#### Delete Team

```http
DELETE /teams/{team_id}
```

Deletes a team.

### Team Members

#### List Team Members

```http
GET /teams/{team_id}/members
```

Returns a list of members for a specific team.

#### Add Team Member

```http
POST /teams/{team_id}/members
Content-Type: application/json

{
  "user_id": "user_uuid",
  "role": "member"
}
```

Adds a user to a team.

#### Update Team Member

```http
PATCH /teams/{team_id}/members/{user_id}
Content-Type: application/json

{
  "role": "admin"
}
```

Updates a team member's role.

#### Remove Team Member

```http
DELETE /teams/{team_id}/members/{user_id}
```

Removes a user from a team.

### Workflows

#### List Workflows

```http
GET /teams/{team_id}/workflows
```

Returns a list of workflows for a specific team.

#### Create Workflow

```http
POST /teams/{team_id}/workflows
Content-Type: application/json

{
  "name": "My Workflow",
  "description": "A workflow for my project"
}
```

Creates a new workflow.

#### Get Workflow

```http
GET /workflows/{workflow_id}
```

Returns details for a specific workflow.

#### Update Workflow

```http
PATCH /workflows/{workflow_id}
Content-Type: application/json

{
  "name": "Updated Workflow Name",
  "description": "Updated description"
}
```

Updates a workflow's information.

#### Delete Workflow

```http
DELETE /workflows/{workflow_id}
```

Deletes a workflow.

### Tasks

#### List Tasks

```http
GET /workflows/{workflow_id}/tasks
```

Returns a list of tasks for a specific workflow.

#### Create Task

```http
POST /workflows/{workflow_id}/tasks
Content-Type: application/json

{
  "name": "My Task",
  "description": "A task for my workflow",
  "assigned_to": "user_uuid",
  "due_date": "2024-05-01T00:00:00Z"
}
```

Creates a new task.

#### Get Task

```http
GET /tasks/{task_id}
```

Returns details for a specific task.

#### Update Task

```http
PATCH /tasks/{task_id}
Content-Type: application/json

{
  "name": "Updated Task Name",
  "description": "Updated description",
  "status": "in_progress"
}
```

Updates a task's information.

#### Delete Task

```http
DELETE /tasks/{task_id}
```

Deletes a task.

### Automation Rules

#### List Automation Rules

```http
GET /teams/{team_id}/automation-rules
```

Returns a list of automation rules for a specific team.

#### Create Automation Rule

```http
POST /teams/{team_id}/automation-rules
Content-Type: application/json

{
  "name": "My Rule",
  "description": "A rule for my team",
  "trigger_type": "event",
  "trigger_conditions": {
    "event_type": "task_completed",
    "task_status": "done"
  },
  "actions": {
    "action_type": "notify",
    "recipients": ["user_uuid"],
    "message": "Task completed!"
  }
}
```

Creates a new automation rule.

#### Get Automation Rule

```http
GET /automation-rules/{rule_id}
```

Returns details for a specific automation rule.

#### Update Automation Rule

```http
PATCH /automation-rules/{rule_id}
Content-Type: application/json

{
  "name": "Updated Rule Name",
  "description": "Updated description",
  "is_active": true
}
```

Updates an automation rule's information.

#### Delete Automation Rule

```http
DELETE /automation-rules/{rule_id}
```

Deletes an automation rule.

## 📦 Request & Response Formats

### Request Format

All requests should use JSON for the request body:

```http
POST /endpoint
Content-Type: application/json

{
  "key": "value"
}
```

### Response Format

All responses are returned in JSON format:

```json
{
  "data": {
    "id": "resource_id",
    "attribute": "value"
  },
  "meta": {
    "timestamp": "2024-04-08T12:00:00Z"
  }
}
```

### Pagination

Endpoints that return lists support pagination using the following query parameters:

- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 20, max: 100)

Example:

```http
GET /teams?page=2&per_page=50
```

Response includes pagination metadata:

```json
{
  "data": [...],
  "meta": {
    "pagination": {
      "current_page": 2,
      "per_page": 50,
      "total_items": 120,
      "total_pages": 3
    }
  }
}
```

### Filtering

Many list endpoints support filtering using query parameters:

```http
GET /tasks?status=in_progress&assigned_to=user_uuid
```

### Sorting

List endpoints support sorting using the `sort` query parameter:

```http
GET /tasks?sort=due_date:asc
```

## ⚠️ Error Handling

The API uses standard HTTP status codes and returns error details in the response body.

### Error Response Format

```json
{
  "error": {
    "code": "invalid_request",
    "message": "The request was invalid",
    "details": [
      {
        "field": "email",
        "message": "must be a valid email address"
      }
    ]
  }
}
```

### Common Error Codes

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | invalid_request | The request was invalid |
| 401 | unauthorized | Authentication is required |
| 403 | forbidden | The request was forbidden |
| 404 | not_found | The resource was not found |
| 409 | conflict | The request conflicts with the current state |
| 429 | rate_limited | Too many requests |
| 500 | server_error | An internal server error occurred |

## 🚦 Rate Limiting

The API implements rate limiting to ensure fair usage. Rate limits are specified in the response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1523456789
```

When the rate limit is exceeded, the API returns a 429 status code:

```json
{
  "error": {
    "code": "rate_limited",
    "message": "Too many requests",
    "retry_after": 60
  }
}
```

## 🔔 Webhooks

ScaleMate supports webhooks to notify your application of events in real-time.

### Registering a Webhook

```http
POST /webhooks
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "events": ["task.created", "task.updated", "task.deleted"],
  "secret": "your_webhook_secret"
}
```

### Webhook Payload

When an event occurs, ScaleMate sends a POST request to your webhook URL with a JSON payload:

```json
{
  "event": "task.created",
  "timestamp": "2024-04-08T12:00:00Z",
  "data": {
    "id": "task_id",
    "name": "Task Name",
    "workflow_id": "workflow_id"
  }
}
```

### Verifying Webhooks

Each webhook request includes a signature in the `X-ScaleMate-Signature` header. You can verify the signature using your webhook secret:

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const expectedSignature = hmac.digest('hex');
  return signature === expectedSignature;
}
```

## 📚 SDKs & Libraries

ScaleMate provides official SDKs for popular programming languages:

### JavaScript/TypeScript

```bash
npm install scalemate-sdk
```

```javascript
const { ScaleMate } = require('scalemate-sdk');

const client = new ScaleMate({
  apiKey: 'your_api_key'
});

// List teams
const teams = await client.teams.list();
```

### Python

```bash
pip install scalemate-sdk
```

```python
from scalemate import ScaleMate

client = ScaleMate(api_key='your_api_key')

# List teams
teams = client.teams.list()
```

### Ruby

```bash
gem install scalemate-sdk
```

```ruby
require 'scalemate'

client = ScaleMate::Client.new(api_key: 'your_api_key')

# List teams
teams = client.teams.list
```

## 📝 Examples

### Creating a Team and Adding Members

```javascript
const { ScaleMate } = require('scalemate-sdk');

const client = new ScaleMate({
  apiKey: 'your_api_key'
});

async function setupTeam() {
  // Create a team
  const team = await client.teams.create({
    name: 'My Project Team',
    description: 'A team for my new project'
  });
  
  // Add team members
  await client.teamMembers.add(team.id, {
    user_id: 'user_uuid_1',
    role: 'admin'
  });
  
  await client.teamMembers.add(team.id, {
    user_id: 'user_uuid_2',
    role: 'member'
  });
  
  return team;
}
```

### Creating a Workflow with Tasks

```python
from scalemate import ScaleMate

client = ScaleMate(api_key='your_api_key')

def create_project_workflow(team_id):
    # Create a workflow
    workflow = client.workflows.create(
        team_id=team_id,
        name='Project Launch',
        description='Workflow for launching a new project'
    )
    
    # Create tasks
    tasks = [
        {
            'name': 'Define Requirements',
            'description': 'Document project requirements',
            'assigned_to': 'user_uuid_1'
        },
        {
            'name': 'Design UI',
            'description': 'Create UI mockups',
            'assigned_to': 'user_uuid_2'
        },
        {
            'name': 'Develop MVP',
            'description': 'Build minimum viable product',
            'assigned_to': 'user_uuid_3'
        }
    ]
    
    for task in tasks:
        client.tasks.create(
            workflow_id=workflow.id,
            **task
        )
    
    return workflow
```

## 📚 Related Documents

- [Database Guide](./database-guide.md) - Database models and migrations
- [Design System](./design.md) - Visual design and components
- [Testing Platform](./testing.md) - Testing environment and strategies
- [Backup Strategy](./backup-history.md) - Backup procedures and version control
- [Architecture Overview](./architecture.md) - System design and components (planned)
- [Security Guidelines](./security.md) - Authentication and compliance (planned)
- [Deployment Strategy](./deployment.md) - Deployment process (planned)
- [In-Memory Bank](./in-memory-bank.md) - Cache integration with APIs
- [Prompt Engineering](./prompt-engineering.md) - AI-powered API capabilities

### Memory Bank Documents
- [Active Context](../../memory-bank/activeContext.md) - Current development status and sprint goals
- [Product Context](../../memory-bank/productContext.md) - Product vision, strategy, and feature overview
- [Technical Context](../../memory-bank/techContext.md) - Technology stack and architectural decisions
- [System Patterns](../../memory-bank/systemPatterns.md) - Architecture, implementation patterns, and file structure
- [Project Brief](../../memory-bank/projectbrief.md) - Project overview, objectives, and success criteria
- [Progress Tracking](../../memory-bank/progress.md) - Project milestones and current development status 