// @generated automatically by Diesel CLI.

diesel::table! {
    issues (id) {
        id -> Int4,
        number -> Int4,
        title -> Text,
        labels -> Nullable<Array<Nullable<Text>>>,
        open -> Bool,
        certified -> Nullable<Bool>,
        assignee_id -> Nullable<Int4>,
        repository_id -> Int4,
        issue_created_at -> Timestamptz,
        issue_closed_at -> Nullable<Timestamptz>,
        created_at -> Timestamptz,
        updated_at -> Nullable<Timestamptz>,
        description -> Nullable<Text>,
        estimation -> Int4,
    }
}

diesel::table! {
    languages (id) {
        id -> Int4,
        slug -> Text,
        created_at -> Timestamptz,
        updated_at -> Nullable<Timestamptz>,
    }
}

diesel::table! {
    notification_schedule (id) {
        id -> Int4,
        next_run -> Timestamptz,
        last_run -> Nullable<Timestamptz>,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
    }
}

diesel::table! {
    notifications (id) {
        id -> Int4,
        github_id -> Int8,
        task_id -> Int4,
        seen -> Nullable<Bool>,
        created_at -> Timestamptz,
    }
}

diesel::table! {
    projects (id) {
        id -> Int4,
        name -> Text,
        slug -> Text,
        types -> Nullable<Array<Nullable<Text>>>,
        purposes -> Nullable<Array<Nullable<Text>>>,
        stack_levels -> Nullable<Array<Nullable<Text>>>,
        technologies -> Nullable<Array<Nullable<Text>>>,
        #[max_length = 255]
        avatar -> Nullable<Varchar>,
        created_at -> Timestamptz,
        updated_at -> Nullable<Timestamptz>,
        rewards -> Bool,
    }
}

diesel::table! {
    repositories (id) {
        id -> Int4,
        slug -> Text,
        name -> Text,
        url -> Text,
        language_slug -> Nullable<Text>,
        project_id -> Int4,
        created_at -> Timestamptz,
        updated_at -> Nullable<Timestamptz>,
    }
}

diesel::table! {
    roles (id) {
        id -> Int4,
        name -> Text,
        created_at -> Timestamptz,
        updated_at -> Nullable<Timestamptz>,
    }
}

diesel::table! {
    task_comments (id) {
        id -> Int4,
        content -> Text,
        task_id -> Int4,
        user_id -> Int4,
        parent_comment_id -> Nullable<Int4>,
        created_at -> Timestamptz,
        updated_at -> Nullable<Timestamptz>,
        status -> Text,
    }
}

diesel::table! {
    tasks (id) {
        id -> Int4,
        number -> Nullable<Int4>,
        repository_id -> Nullable<Int4>,
        title -> Text,
        description -> Nullable<Text>,
        url -> Nullable<Text>,
        labels -> Nullable<Array<Nullable<Text>>>,
        open -> Bool,
        #[sql_name = "type"]
        type_ -> Text,
        project_id -> Nullable<Int4>,
        created_by_user_id -> Nullable<Int4>,
        assignee_user_id -> Nullable<Int4>,
        assignee_team_id -> Nullable<Int4>,
        funding_options -> Nullable<Array<Nullable<Text>>>,
        contact -> Nullable<Text>,
        skills -> Nullable<Array<Nullable<Text>>>,
        bounty -> Nullable<Int4>,
        approved_by -> Nullable<Array<Nullable<Int4>>>,
        approved_at -> Nullable<Timestamptz>,
        status -> Text,
        upvotes -> Nullable<Int4>,
        downvotes -> Nullable<Int4>,
        is_featured -> Nullable<Bool>,
        is_certified -> Nullable<Bool>,
        featured_by_user_id -> Nullable<Int4>,
        issue_created_at -> Nullable<Timestamptz>,
        issue_closed_at -> Nullable<Timestamptz>,
        created_at -> Timestamptz,
        updated_at -> Nullable<Timestamptz>,
    }
}

diesel::table! {
    tasks_votes (id) {
        id -> Int4,
        user_id -> Int4,
        task_id -> Int4,
        vote -> Int4,
    }
}

diesel::table! {
    team_memberships (id) {
        id -> Int4,
        team_id -> Int4,
        user_id -> Int4,
        role -> Text,
        joined_at -> Timestamptz,
    }
}

diesel::table! {
    teams (id) {
        id -> Int4,
        name -> Text,
        description -> Nullable<Text>,
        created_by_user_id -> Int4,
        created_at -> Timestamptz,
        updated_at -> Nullable<Timestamptz>,
    }
}

diesel::table! {
    user_subscriptions (id) {
        id -> Int4,
        github_id -> Int8,
        purpose -> Nullable<Text>,
        stack_level -> Nullable<Text>,
        technology -> Nullable<Text>,
        created_at -> Timestamptz,
    }
}

diesel::table! {
    users (id) {
        id -> Int4,
        username -> Text,
        avatar -> Nullable<Text>,
        created_at -> Timestamptz,
        updated_at -> Nullable<Timestamptz>,
        github_id -> Nullable<Int8>,
        email_notifications_enabled -> Bool,
        email -> Nullable<Text>,
        bio -> Nullable<Text>,
        skills -> Nullable<Array<Nullable<Text>>>,
        interests -> Nullable<Array<Nullable<Text>>>,
        telegram -> Nullable<Text>,
        twitter -> Nullable<Text>,
    }
}

diesel::table! {
    users_projects_roles (id) {
        id -> Int4,
        user_id -> Int4,
        project_id -> Nullable<Int4>,
        role_id -> Int4,
        created_at -> Timestamptz,
    }
}

diesel::joinable!(issues -> repositories (repository_id));
diesel::joinable!(issues -> users (assignee_id));
diesel::joinable!(notifications -> tasks (task_id));
diesel::joinable!(repositories -> projects (project_id));
diesel::joinable!(task_comments -> tasks (task_id));
diesel::joinable!(task_comments -> users (user_id));
diesel::joinable!(tasks -> projects (project_id));
diesel::joinable!(tasks -> repositories (repository_id));
diesel::joinable!(tasks_votes -> tasks (task_id));
diesel::joinable!(tasks_votes -> users (user_id));
diesel::joinable!(team_memberships -> teams (team_id));
diesel::joinable!(team_memberships -> users (user_id));
diesel::joinable!(users_projects_roles -> projects (project_id));
diesel::joinable!(users_projects_roles -> roles (role_id));
diesel::joinable!(users_projects_roles -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    issues,
    languages,
    notification_schedule,
    notifications,
    projects,
    repositories,
    roles,
    task_comments,
    tasks,
    tasks_votes,
    team_memberships,
    teams,
    user_subscriptions,
    users,
    users_projects_roles,
);
