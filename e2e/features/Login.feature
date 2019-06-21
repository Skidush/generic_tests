@Login
Feature: Login
    As a user
    I should be able to login only with the right credentials.

    Scenario Outline: Login with <scenario>
        Given I go to "/#/login"
        When I enter "<username>" in username and "<password>" in password
        And I click the "login" button
        Then I should see the dashboard

    @Regression @LoginSuccess
    Scenarios:
        | scenario            | username  | password  |
        | correct credentials | dev       | test      |