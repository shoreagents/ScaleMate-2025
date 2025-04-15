# 📦 ScaleMate Backup & Migration Strategy

## 🔄 Backup Strategy

### 1. Database Backups
- Frequency: Daily
- Retention: 30 days
- Type: Full backup
- Location: Secure cloud storage
- Encryption: AES-256
- Format: SQL dumps + Point-in-time recovery logs

### 2. File Storage Backups
- Frequency: Daily
- Retention: 30 days
- Type: Incremental backup
- Location: Secure cloud storage
- Encryption: AES-256

### 3. Code Repository Backups
- Frequency: Real-time
- Retention: Permanent
- Type: Git history
- Location: GitHub
- Protection: Branch protection

### 4. Migration History Backups
- Frequency: On every migration
- Retention: Permanent
- Type: SQL migration logs
- Location: Versioned with codebase
- Format: Timestamped SQL files

## ⏱️ Backup Schedule

### Daily Backups
```
00:00 UTC - Database backup
01:00 UTC - File storage backup
02:00 UTC - Configuration backup
03:00 UTC - Log backup
04:00 UTC - Migration state backup
```

### Weekly Backups
```
Sunday 00:00 UTC - Full system backup
Sunday 01:00 UTC - Performance metrics backup
Sunday 02:00 UTC - Analytics data backup
Sunday 03:00 UTC - Migration verification backup
```

### Monthly Backups
```
1st of month 00:00 UTC - Archive backup
1st of month 01:00 UTC - Compliance backup
1st of month 02:00 UTC - Security audit backup
1st of month 03:00 UTC - Schema snapshot backup
```

## 📊 Backup Types

### 1. Full Backup
- Complete system state
- All data and configurations
- System settings
- User data
- Application state

### 2. Incremental Backup
- Changes since last backup
- New data
- Modified data
- Deleted data
- Configuration changes

### 3. Differential Backup
- Changes since last full backup
- New data
- Modified data
- Deleted data
- Configuration changes

### 4. Schema-Only Backup
- Table definitions
- Indices
- Functions
- Triggers
- Views
- RLS policies

## 🔄 Recovery Procedures

### 1. Database Recovery
```bash
# Stop application
systemctl stop scalemate

# Restore database
pg_restore -d scalemate -v backup_file.dump

# Verify migration state
psql -d scalemate -c "SELECT version, name, executed_at FROM schema_migrations ORDER BY id DESC LIMIT 5;"

# Test critical queries
psql -d scalemate -c "SELECT count(*) FROM users;"

# Start application
systemctl start scalemate
```

### 2. File Storage Recovery
```bash
# Stop file service
systemctl stop scalemate-files

# Restore files
aws s3 sync s3://backup-bucket/2024-01-01/ /var/www/files/

# Verify restoration
ls -la /var/www/files/

# Start file service
systemctl start scalemate-files
```

### 3. Configuration Recovery
```bash
# Stop application
systemctl stop scalemate

# Restore configuration
cp /backup/config/2024-01-01/* /etc/scalemate/

# Verify restoration
cat /etc/scalemate/config.json

# Start application
systemctl start scalemate
```

### 4. Migration State Recovery
```bash
# Check current migration state
supabase db remote commit

# Verify migration state matches production
supabase db diff

# Reset to specific migration version if needed
supabase db reset --version=20240215140312

# Verify schema integrity
supabase db lint
```

## 📊 Backup Monitoring

### 1. Health Checks
- Backup success/failure
- Backup size
- Backup duration
- Storage usage
- Recovery time
- Migration integrity

### 2. Alerts
- Backup failure
- Storage threshold
- Recovery failure
- Security breach
- Performance issues
- Migration drift

### 3. Reporting
- Daily backup report
- Weekly summary
- Monthly analysis
- Annual review
- Compliance report
- Migration audit

## 🛡️ Backup Security

### 1. Encryption
- At-rest encryption
- In-transit encryption
- Key management
- Access control
- Audit logging

### 2. Access Control
- Role-based access
- Multi-factor authentication
- IP whitelisting
- Session management
- Activity logging

### 3. Compliance
- GDPR compliance
- Data retention
- Privacy protection
- Security standards
- Audit trails

## 📝 Backup History Log

### Format
```json
{
  "timestamp": "2024-01-01T00:00:00Z",
  "type": "full",
  "status": "success",
  "size": "1.2GB",
  "duration": "15m",
  "location": "s3://backup-bucket/2024-01-01/",
  "checksum": "sha256:abc123...",
  "metadata": {
    "version": "1.0.0",
    "environment": "production",
    "backup_id": "backup-2024-01-01",
    "migration_version": "20240215140312"
  }
}
```

### History Tracking
- Backup timestamp
- Backup type
- Backup status
- Backup size
- Backup duration
- Backup location
- Backup checksum
- Backup metadata
- Schema version

## 📐 SQL Migration Integration

### File Structure Integration
```
/supabase
├── migrations/             # SQL files in versioned order
├── policies/               # RLS definitions per table
├── roles/                  # Custom Postgres roles if needed
├── edge-functions/         # Supabase edge function logic
├── seed/                   # Optional seeding files 
└── backup/                 # Backup scripts and logs
    ├── scripts/            # Backup automation scripts
    ├── logs/               # Backup operation logs
    └── state/              # Migration state snapshots
```

### Backup-Migration Workflow
1. **Pre-Migration Backup**: Full schema backup before migration
2. **Migration Execution**: Apply and version new schema changes
3. **Post-Migration Verification**: Validate schema integrity
4. **Snapshot Creation**: Create schema snapshot for reference
5. **Backup Tag**: Tag backup with migration version

## 🔧 Best Practices

### 1. Backup Management
- **Automated Scheduling**: Use CI/CD to automate backup tasks
- **Diverse Storage**: Use multiple storage providers
- **Integrity Checks**: Validate backup integrity with checksums
- **Rotation Policy**: Implement automatic rotation policy
- **Monitoring**: Set up proactive monitoring and alerts
- **Documentation**: Maintain detailed documentation
- **Training**: Train team members on recovery procedures
- **Testing**: Regularly test recovery procedures

### 2. Database Migration Security
- **Schema Snapshots**: Take schema-only backups before migrations
- **Rollback Plan**: Document rollback procedures for each migration
- **Migration Testing**: Test migrations in staging before production
- **Version Control**: Keep all migrations in version control
- **Atomic Changes**: Design migrations to be atomic and reversible
- **Scheduled Maintenance**: Schedule migrations during low-traffic periods
- **Blue-Green Deployments**: Use blue-green for zero-downtime migrations

### 3. Supabase-Specific Practices
- **CLI Integration**: Use Supabase CLI for consistent migrations
- **RLS Validation**: Verify RLS policies after migrations
- **Function Testing**: Test edge functions after recovery
- **Local Development**: Use local Supabase for testing migrations
- **Auth Integration**: Ensure auth system compatibility with migrations
- **Storage Buckets**: Include storage bucket policies in backups
- **Environment Parity**: Maintain environment parity across stages

### 4. Recovery Testing
- **Monthly Drills**: Perform monthly recovery drills
- **Comprehensive Testing**: Test all recovery procedures
- **Documentation Updates**: Update documentation based on learnings
- **Performance Metrics**: Track recovery time and success rate
- **Failure Scenarios**: Test various failure scenarios
- **Team Training**: Train all team members on recovery procedures
- **Report Generation**: Generate detailed reports of recovery tests

## 🧪 SQL Migration Checklist

### Pre-Migration
- [ ] Full database backup completed
- [ ] Notification sent to development team
- [ ] Migration plan reviewed by team
- [ ] Schema snapshots created
- [ ] RLS policies backed up
- [ ] Edge functions backed up
- [ ] Test suite run and passing

### During Migration
- [ ] Application in maintenance mode
- [ ] Execute migrations in order
- [ ] Log each migration step
- [ ] Verify row counts and integrity
- [ ] Test key functionality
- [ ] Monitor system performance

### Post-Migration
- [ ] Verify migration completed successfully
- [ ] Test application functionality
- [ ] Verify RLS policies working
- [ ] Verify edge functions working
- [ ] Take fresh backup of new schema
- [ ] Update documentation
- [ ] Notify team of successful migration

## 📄 Backup Command Reference

### Backup Commands
```bash
# Export full database
pg_dump -h ${DB_HOST} -U ${DB_USER} -d ${DB_NAME} -Fc > backup_$(date +%Y%m%d).dump

# Schema-only backup
pg_dump -h ${DB_HOST} -U ${DB_USER} -d ${DB_NAME} --schema-only -f schema_$(date +%Y%m%d).sql

# With Supabase CLI
supabase db dump -f backup_$(date +%Y%m%d).sql

# Backup specific tables
pg_dump -h ${DB_HOST} -U ${DB_USER} -d ${DB_NAME} -t users -t profiles -Fc > users_$(date +%Y%m%d).dump

# Store in S3
aws s3 cp backup_$(date +%Y%m%d).dump s3://scalemate-backups/
```

### Restore Commands
```bash
# Restore full database
pg_restore -h ${DB_HOST} -U ${DB_USER} -d ${DB_NAME} -v backup_20240101.dump

# Restore specific tables
pg_restore -h ${DB_HOST} -U ${DB_USER} -d ${DB_NAME} -t users -v users_20240101.dump

# With Supabase CLI
supabase db restore backup_20240101.sql

# Restore from S3
aws s3 cp s3://scalemate-backups/backup_20240101.dump .
pg_restore -h ${DB_HOST} -U ${DB_USER} -d ${DB_NAME} -v backup_20240101.dump
```

### Migration Commands
```bash
# Create new migration
supabase migration new add_users_table

# Apply migrations
supabase db reset

# Apply specific migration
supabase db reset --version=20240215140312

# Check migration status
supabase db remote commit

# Compare local with remote
supabase db diff
```

## 🔄 Automated Scripts

### Backup Automation
```bash
#!/bin/bash
# backup.sh - Daily database backup script

# Configuration
DB_HOST=${SUPABASE_DB_HOST}
DB_USER=${SUPABASE_DB_USER}
DB_NAME=${SUPABASE_DB_NAME}
BACKUP_DIR="/var/backups/scalemate"
S3_BUCKET="s3://scalemate-backups"
DATE=$(date +%Y%m%d)
LOG_FILE="${BACKUP_DIR}/logs/backup_${DATE}.log"

# Ensure backup directory exists
mkdir -p ${BACKUP_DIR}/logs

# Start logging
echo "Starting backup at $(date)" > ${LOG_FILE}

# Full database backup
echo "Creating full backup..." >> ${LOG_FILE}
pg_dump -h ${DB_HOST} -U ${DB_USER} -d ${DB_NAME} -Fc > ${BACKUP_DIR}/full_${DATE}.dump
echo "Full backup completed at $(date)" >> ${LOG_FILE}

# Schema-only backup
echo "Creating schema-only backup..." >> ${LOG_FILE}
pg_dump -h ${DB_HOST} -U ${DB_USER} -d ${DB_NAME} --schema-only -f ${BACKUP_DIR}/schema_${DATE}.sql
echo "Schema backup completed at $(date)" >> ${LOG_FILE}

# Upload to S3
echo "Uploading to S3..." >> ${LOG_FILE}
aws s3 cp ${BACKUP_DIR}/full_${DATE}.dump ${S3_BUCKET}/daily/
aws s3 cp ${BACKUP_DIR}/schema_${DATE}.sql ${S3_BUCKET}/schema/
echo "S3 upload completed at $(date)" >> ${LOG_FILE}

# Cleanup old backups (keep last 30 days)
find ${BACKUP_DIR} -name "full_*.dump" -mtime +30 -delete
find ${BACKUP_DIR} -name "schema_*.sql" -mtime +30 -delete
echo "Cleanup completed at $(date)" >> ${LOG_FILE}

# Send notification
echo "Backup completed successfully at $(date)" >> ${LOG_FILE}
```

### Migration Integration Script
```bash
#!/bin/bash
# migrate.sh - Safe database migration script

# Configuration
APP_ENV=${APP_ENV:-production}
BACKUP_DIR="/var/backups/scalemate"
DATE=$(date +%Y%m%d%H%M%S)
LOG_FILE="${BACKUP_DIR}/logs/migration_${DATE}.log"

# Ensure backup directory exists
mkdir -p ${BACKUP_DIR}/logs

# Start logging
echo "Starting migration process at $(date)" > ${LOG_FILE}

# 1. Pre-migration backup
echo "Creating pre-migration backup..." >> ${LOG_FILE}
./backup.sh pre_migration_${DATE}
echo "Pre-migration backup completed at $(date)" >> ${LOG_FILE}

# 2. Put application in maintenance mode
echo "Enabling maintenance mode..." >> ${LOG_FILE}
if [ "$APP_ENV" = "production" ]; then
  # Enable maintenance mode
  systemctl stop scalemate
fi

# 3. Run migrations
echo "Running migrations..." >> ${LOG_FILE}
supabase db reset
MIGRATION_STATUS=$?

# 4. Verify migration success
if [ $MIGRATION_STATUS -eq 0 ]; then
  echo "Migration successful at $(date)" >> ${LOG_FILE}
  
  # 5. Post-migration verification
  echo "Running verification tests..." >> ${LOG_FILE}
  npm run test:migration
  TEST_STATUS=$?
  
  if [ $TEST_STATUS -eq 0 ]; then
    echo "Verification tests passed at $(date)" >> ${LOG_FILE}
    
    # 6. Take app out of maintenance mode
    echo "Disabling maintenance mode..." >> ${LOG_FILE}
    if [ "$APP_ENV" = "production" ]; then
      systemctl start scalemate
    fi
    
    # 7. Post-migration backup
    echo "Creating post-migration backup..." >> ${LOG_FILE}
    ./backup.sh post_migration_${DATE}
    echo "Post-migration backup completed at $(date)" >> ${LOG_FILE}
    
    echo "Migration process completed successfully at $(date)" >> ${LOG_FILE}
  else
    echo "ERROR: Verification tests failed at $(date)" >> ${LOG_FILE}
    
    # Rollback if in production
    if [ "$APP_ENV" = "production" ]; then
      echo "Rolling back migration..." >> ${LOG_FILE}
      pg_restore -h ${DB_HOST} -U ${DB_USER} -d ${DB_NAME} -v ${BACKUP_DIR}/pre_migration_${DATE}.dump
      systemctl start scalemate
    fi
    
    echo "Migration process failed at $(date)" >> ${LOG_FILE}
  fi
else
  echo "ERROR: Migration failed at $(date)" >> ${LOG_FILE}
  
  # Rollback if in production
  if [ "$APP_ENV" = "production" ]; then
    echo "Rolling back migration..." >> ${LOG_FILE}
    pg_restore -h ${DB_HOST} -U ${DB_USER} -d ${DB_NAME} -v ${BACKUP_DIR}/pre_migration_${DATE}.dump
    systemctl start scalemate
  fi
  
  echo "Migration process failed at $(date)" >> ${LOG_FILE}
fi
```

## 📚 Related Documents

- [API Documentation](./api-documentation.md) - API backup procedures
- [Architecture Overview](./architecture.md) - System architecture and backup strategy
- [Database Guide](./database-guide.md) - Database backup procedures
- [Design System](./design.md) - UI component versioning
- [Testing Platform](./testing.md) - Backup testing procedures
- [Security Guidelines](./security.md) - Data security and backup encryption
- [Deployment Strategy](./deployment.md) - Deployment backup procedures
- [Prompt Engineering](./prompt-engineering.md) - AI-assisted backup operations
- [In-Memory Bank](./in-memory-bank.md) - Cache persistence strategies

### Memory Bank Documents
- [Active Context](../../memory-bank/activeContext.md) - Current development status and sprint goals
- [Product Context](../../memory-bank/productContext.md) - Product vision, strategy, and feature overview
- [Technical Context](../../memory-bank/techContext.md) - Technology stack and architectural decisions
- [System Patterns](../../memory-bank/systemPatterns.md) - Architecture, implementation patterns, and file structure
- [Project Brief](../../memory-bank/projectbrief.md) - Project overview, objectives, and success criteria
- [Progress Tracking](../../memory-bank/progress.md) - Project milestones and current development status 