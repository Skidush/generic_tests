@GenericRead
Feature: Read an Item
    As a user
    I should be able to view and read the details of an item.
    
    @GenericReadFromTable
    Scenario Outline: Read <itemType> details from the table
        Given I have an existing <itemType>
            And I am on <itemUrl>
        When The <itemType> table has loaded
        Then I should <view> the details of the <itemTypePlural> in the table

    @CompanyCRUD @ReadCompanyFromTable
    Scenarios:
        | itemType  | itemUrl              | view  | itemTypePlural |
        | "Company" | "/#/hmws/companies"  | "see" | "Companies"    |

    @SkillCRUD @ReadSkillFromTable
    Scenarios:
        | itemType  | itemUrl              | view  | itemTypePlural |
        | "Skill"   | "/#/hmws/skills"     | "see" | "Skills"       |

    @MachineCRUD @ReadMachineFromTable
    Scenarios:
        | itemType  | itemUrl              | view  | itemTypePlural |
        | "Machine" | "/#/hmws/machines"   | "see" | "Machines"     |
    
    @GenericReadFromDetails
    Scenario Outline: Read <itemType> from the details page
        Given I have an existing <itemType>
        When I navigate to a/an <itemType> details page
        Then I should see the <action> details of the <itemType>

    @CompanyCRUD @ReadCompanyFromDetails
    Scenarios:
        | itemType  | itemUrl              | action       |
        | "Company" | "/#/hmws/companies"  | "selected"   |

    @SkillCRUD @ReadSkillFromDetails
    Scenarios:
        | itemType  | itemUrl              | action       |
        | "Skill"   | "/#/hmws/skills"     | "selected"   |

    @MachineCRUD @ReadMachineFromDetails
    Scenarios:
        | itemType  | itemUrl              | action       |
        | "Machine" | "/#/hmws/machines"   | "selected"   |