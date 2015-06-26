import StringIO, csv, copy
from unicode_csv import UnicodeWriter

politicians = []

offsets = {
    'last_name':                                                -1,
    'fisa_courts_reform_act':                                   -1,
    's_1551_iosra':                                             -1,
    'fisa_improvements_act':                                    -1,
    'fisa_transparency_and_modernization_act':                  -1,
    'surveillance_state_repeal_act':                            -1,
    'usa_freedom_prior_to_2014-05-18':                          -1,
    'voted_for_conyers_amash_amendment':                        -1,
    'voted_for_house_version_of_usa_freedom_act_2014':          -1,
    'voted_for_massie_lofgren_amendment_2014':                  -1,
    'whistleblower_protection_for_ic_employees_contractors':    -1,
    '1st_usaf_cloture_vote':                                    -1,
    'straight_reauth':                                          -1,
    'fisa_reform_act':                                          -1,
    'amendment_1449_data_retention':                            -1,
    'amendment_1450_extend_implementation_to_1yr':              -1,
    'amendment_1451_gut_amicus':                                -1,
    'final_passage_usaf':                                       -1,
    '702_reforms':                                              -1,
    'massie_lofgren_amendment_to_hr2685_defund_702':            -1,
    'massie_lofgren_amendment_to_hr4870_no_backdoors':          -1,
    }

with open ("scorecard.csv", "rU") as myfile:
    reader = csv.reader(myfile, delimiter=",")

    for index, row in enumerate(reader):

        # the first row has column names. map these to our offset values.
        if index == 0:

            for subindex, field in enumerate(row):

                field = field.strip()

                if field == 'name':
                    offsets['last_name'] = subindex

                elif field == 'sp/co FISA Courts Reform Act (+3)':
                    offsets['fisa_courts_reform_act'] = subindex

                elif field == 'sp/co S. 1551, IOSRA (+4)':
                    offsets['s_1551_iosra'] = subindex

                elif field == 'sp/co FISA Improvements Act (-4)':
                    offsets['fisa_improvements_act'] = subindex

                elif field == 'sp/co FISA Transparency & Modernization Act (-4)':
                    offsets['fisa_transparency_and_modernization_act'] = subindex

                elif field == 'sp/co Surveillance State Repeal Act (2014 or 2015) (+4)':
                    offsets['surveillance_state_repeal_act'] = subindex

                elif field == 'sp/co USA FREEDOM prior to 2014-05-18 (+2)':
                    offsets['usa_freedom_prior_to_2014-05-18'] = subindex

                elif field == 'voted for Conyers/Amash amendment (+4)':
                    offsets['voted_for_conyers_amash_amendment'] = subindex

                elif field == 'voted for House version of USA Freedom 2014 (-2)':
                    offsets['voted_for_house_version_of_usa_freedom_act_2014'] = subindex

                elif field == 'voted for Massie-Lofgren amendment 2014 (+3)':
                    offsets['voted_for_massie_lofgren_amendment_2014'] = subindex
                
                elif field == 'Sp/co whistleblower protection for IC employees/contractors':
                    offsets['whistleblower_protection_for_ic_employees_contractors'] = subindex

                elif field == '1st USAF cloture vote':
                    offsets['1st_usaf_cloture_vote'] = subindex

                elif field == 'Straight reauth':
                    offsets['straight_reauth'] = subindex

                elif field == 'Sp/co FISA Reform Act':
                    offsets['fisa_reform_act'] = subindex

                elif field == 'Amdmt 1449: Data retention':
                    offsets['amendment_1449_data_retention'] = subindex

                elif field == 'Amdmt 1450: Extend implementation to 1yr':
                    offsets['amendment_1450_extend_implementation_to_1yr'] = subindex

                elif field == 'Amdmt 1451: Gut amicus':
                    offsets['amendment_1451_gut_amicus'] = subindex

                elif field == 'Final passage USAF':
                    offsets['final_passage_usaf'] = subindex

                elif field == 'Sp/co 702 reforms (+4)':
                    offsets['702_reforms'] = subindex

                elif field == 'Massie-Lofgrenamdmt to HR2685: Defund 702 (+3/-3)':
                    offsets['massie_lofgren_amendment_to_hr2685_defund_702'] = subindex

                elif field == 'Massie-Lofgren amdmt on HR4870: No Encryption Backdoors (+3/-3)':
                    offsets['massie_lofgren_amendment_to_hr4870_no_backdoors'] = subindex

            # sanity check to make sure we caught all offsets
            for offset in offsets:
                if offsets[offset] == -1:
                    print "-- ERROR: MISSING OFFSET: %s --" % offset
                    raise Exception('missing some columns')

        else:

            politician = copy.copy(offsets)

            for key in politician:
                politician[key] = ""

            politician['last_name'] = row[offsets['last_name']].strip()

            if row[offsets['fisa_courts_reform_act']] == "3":
                politician['fisa_courts_reform_act'] = 'X'

            if row[offsets['s_1551_iosra']] == "4":
                politician['s_1551_iosra'] = 'X'

            if row[offsets['fisa_improvements_act']] == "-4":
                politician['fisa_improvements_act'] = 'X'

            if row[offsets['fisa_transparency_and_modernization_act']] == "-4":
                politician['fisa_transparency_and_modernization_act'] = 'X'

            if row[offsets['surveillance_state_repeal_act']] == "4":
                politician['surveillance_state_repeal_act'] = 'X'

            if row[offsets['usa_freedom_prior_to_2014-05-18']] == "2":
                politician['usa_freedom_prior_to_2014-05-18'] = 'X'

            if row[offsets['voted_for_conyers_amash_amendment']] == "4":
                politician['voted_for_conyers_amash_amendment'] = 'X'

            if row[offsets['voted_for_house_version_of_usa_freedom_act_2014']] == "-2":
                politician['voted_for_house_version_of_usa_freedom_act_2014'] = 'X'

            if row[offsets['voted_for_massie_lofgren_amendment_2014']] == "3":
                politician['voted_for_massie_lofgren_amendment_2014'] = 'X'

            if row[offsets['whistleblower_protection_for_ic_employees_contractors']] == "4":
                politician['whistleblower_protection_for_ic_employees_contractors'] = 'X'

            if row[offsets['1st_usaf_cloture_vote']] == "4":
                politician['1st_usaf_cloture_vote'] = 'GOOD'
            if row[offsets['1st_usaf_cloture_vote']] == "1":
                politician['1st_usaf_cloture_vote'] = 'OK'
            elif row[offsets['1st_usaf_cloture_vote']] == "-4":
                politician['1st_usaf_cloture_vote'] = 'BAD'

            if row[offsets['straight_reauth']] == "3":
                politician['straight_reauth'] = 'GOOD'
            elif row[offsets['straight_reauth']] == "-3":
                politician['straight_reauth'] = 'BAD'

            if row[offsets['fisa_reform_act']] == "-3":
                politician['fisa_reform_act'] = 'X'

            if row[offsets['amendment_1449_data_retention']] == "1":
                politician['amendment_1449_data_retention'] = 'GOOD'
            elif row[offsets['amendment_1449_data_retention']] == "-3":
                politician['amendment_1449_data_retention'] = 'BAD'

            if row[offsets['amendment_1450_extend_implementation_to_1yr']] == "1":
                politician['amendment_1450_extend_implementation_to_1yr'] = 'GOOD'
            elif row[offsets['amendment_1450_extend_implementation_to_1yr']] == "-2":
                politician['amendment_1450_extend_implementation_to_1yr'] = 'BAD'

            if row[offsets['amendment_1451_gut_amicus']] == "1":
                politician['amendment_1451_gut_amicus'] = 'GOOD'
            elif row[offsets['amendment_1451_gut_amicus']] == "-3":
                politician['amendment_1451_gut_amicus'] = 'BAD'

            if row[offsets['final_passage_usaf']] == "4":
                politician['final_passage_usaf'] = 'GOOD'
            elif row[offsets['final_passage_usaf']] == "1":
                politician['final_passage_usaf'] = 'OK'
            elif row[offsets['final_passage_usaf']] == "-4":
                politician['final_passage_usaf'] = 'BAD'

            if row[offsets['702_reforms']] == "4":
                politician['702_reforms'] = 'X'

            if row[offsets['massie_lofgren_amendment_to_hr2685_defund_702']] == "3":
                politician['massie_lofgren_amendment_to_hr2685_defund_702'] = 'GOOD'
            elif row[offsets['massie_lofgren_amendment_to_hr2685_defund_702']] == "-3":
                politician['massie_lofgren_amendment_to_hr2685_defund_702'] = 'BAD'

            if row[offsets['massie_lofgren_amendment_to_hr4870_no_backdoors']] == "3":
                politician['massie_lofgren_amendment_to_hr4870_no_backdoors'] = 'GOOD'
            elif row[offsets['massie_lofgren_amendment_to_hr4870_no_backdoors']] == "-3":
                politician['massie_lofgren_amendment_to_hr4870_no_backdoors'] = 'BAD'

            politicians.append(politician)

header_fields = [
    'last_name',
    'fisa_courts_reform_act',
    's_1551_iosra',
    'fisa_improvements_act',
    'fisa_transparency_and_modernization_act',
    'surveillance_state_repeal_act',
    'usa_freedom_prior_to_2014-05-18',
    'voted_for_conyers_amash_amendment',
    'voted_for_house_version_of_usa_freedom_act_2014',
    'voted_for_massie_lofgren_amendment_2014',
    'whistleblower_protection_for_ic_employees_contractors',
    '1st_usaf_cloture_vote',
    'straight_reauth',
    'fisa_reform_act',
    'amendment_1449_data_retention',
    'amendment_1450_extend_implementation_to_1yr',
    'amendment_1451_gut_amicus',
    'final_passage_usaf',
    '702_reforms',
    'massie_lofgren_amendment_to_hr2685_defund_702',
    'massie_lofgren_amendment_to_hr4870_no_backdoors',
]

with open('output.csv', 'wb') as csv_file:
    csv_writer = UnicodeWriter(csv_file, delimiter=',')
    csv_writer.writerow(header_fields)

    for i, politician in enumerate(politicians):
        print politician

        try:
            last_name = unicode(politician['last_name'], 'ascii')
        except:
            last_name = unicode(politician['last_name'], 'latin-1')

        csv_writer.writerow([
            last_name,
            politician['fisa_courts_reform_act'],
            politician['s_1551_iosra'],
            politician['fisa_improvements_act'],
            politician['fisa_transparency_and_modernization_act'],
            politician['surveillance_state_repeal_act'],
            politician['usa_freedom_prior_to_2014-05-18'],
            politician['voted_for_conyers_amash_amendment'],
            politician['voted_for_house_version_of_usa_freedom_act_2014'],
            politician['voted_for_massie_lofgren_amendment_2014'],
            politician['whistleblower_protection_for_ic_employees_contractors'],
            politician['1st_usaf_cloture_vote'],
            politician['straight_reauth'],
            politician['fisa_reform_act'],
            politician['amendment_1449_data_retention'],
            politician['amendment_1450_extend_implementation_to_1yr'],
            politician['amendment_1451_gut_amicus'],
            politician['final_passage_usaf'],
            politician['702_reforms'],
            politician['massie_lofgren_amendment_to_hr2685_defund_702'],
            politician['massie_lofgren_amendment_to_hr4870_no_backdoors'],
        ])