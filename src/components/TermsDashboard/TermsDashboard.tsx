import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './TermsDashboard.module.sass';

export const TermsDashboard: FC = () => {
  return (
    <div className={styles.termsWrapper}>
      <div className={styles.textWrapper}>
        <Typography className={styles.title}>MZ, LLC User Terms of Use</Typography>
        <div className={styles.article}>
          <Typography variant={'h6'} className={styles.text}>
            MZ, LLC, a Limited Liability Company organized under the laws of the State of Florida and
            headquartered in Tampa (”MZ” or “we” or “us” or “our”) welcomes you. References to MZer include
            any subsidiaries or affiliates of MZ involved with providing our Services. We invite you to access
            and use our Services (as defined below), which are made available to you through a variety of platforms,
            including www.MZer.com and our mobile software application known as “MZer” (referred to in these
            Terms of Use as the “App”), which is accessible through tablets, smart phones, connected televisions, and
            other devices. Our Website and our App are collectively referred to as our “Platform.”
          </Typography>
        </div>
        <div className={styles.article}>
          <Typography variant={'h6'} className={styles.text}>
            Capitalized terms used but not specifically defined in these User Terms of Use have the meanings as set
            forth in our Privacy Policy or our Partner Terms of Use. Capitalized terms used but not specifically defined
            in these User Terms of Use or in our Privacy Policy or our Partner Terms of Use have the meanings as set
            forth in the Health Insurance Portability and Accountability Act of 1996, the Health Information Technology
            for Economic and Clinical Health Act, and their implementing regulations, as amended from time to time
            (collectively, referred to as “HIPAA”).
          </Typography>
        </div>
        <ol className={styles.article}>
          <li>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                <Typography variant={'h6'} className={styles.subtitle}>
                  Description of Users and Acceptance of Terms
                </Typography>
                Visitors to our Platform may view our publicly available content. We provide our Services to Users, as
                defined below, subject to these User Terms of Use. We provide our Services to Partners, as defined
                below, subject to our Partner Terms of Use, available on our Website. By browsing the public areas of
                our Platform as a Visitor, or by registering, accessing, or using our Platform or Services as a User,
                you acknowledge that you have read, understood, and agree to be legally bound by these User Terms of Use
                and our Privacy Policy, which is hereby incorporated by reference (collectively, this “Agreement”). If
                you do not agree to the terms and conditions of this Agreement, then please do not use our Platform or
                Services. We reserve the right to modify, replace, or update these User Terms of Use from time to time
                without notice, and your continued use of our Platform of Services constitutes your agreement to such
                modifications, replacements, or updates.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                Through our Platform, we offer on-demand prescription drug delivery services (together, with any related
                or ancillary services, or any updates, new features, or enhancements to such services, the “Services”).
                We provide our Visitors, Users, and Partners access to our Platform and Services as described below:
                <ul>
                  <li>
                    Visitors. Visitors, as the term implies, are individuals who are not registered with us, but who
                    want to explore our publicly available content. Visitors can: (i) view all publicly available
                    content on the Platform; and (ii) e-mail us. No registration is required for Visitors.
                  </li>
                  <li>
                    Users. Users can do all the things Visitors can do, and can: (i) create, access, manage, and update
                    User accounts; and (ii) access and use our Platform and Services on their own behalf. Registration
                    is required for Users.
                  </li>
                  <li>
                    Partners. Partners include healthcare providers, pharmacists and pharmacies, and payers. Partners
                    can do all the things Visitors can do, and can: (i) create, access, manage, and update Partner
                    accounts; and (ii) access and use our Platform and Services on behalf of their patients, customers,
                    or members. Registration is required for Partners.
                  </li>
                </ul>
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                We are under no obligation to accept any individual as a User, and we reserve the right to accept or
                reject any User registration in our sole discretion. In addition, we may suspend a User’s access to our
                Platform or stop providing our Services to a User if the User does not comply with this Agreement or our
                other policies or if we are investigating suspected misconduct.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                MZer is concerned about the safety and privacy of children. For this reason, you must be at least
                eighteen (18) years of age to use our Platform and Services. Otherwise you may use the Platform and
                Services only with the involvement of a parent or guardian. By registering, accessing, or using our
                Platform or Services as a User you represent and warrant that you are a person at least 18 years of age.
                You, as a parent or guardian of a minor child, may use the Platform or Services as a User on behalf of
                such minor child. You, as an authorized caregiver of another person, may use the Platform or Services as
                a User on behalf of such other person for so long as you remain an authorized caregiver of such person.
                You acknowledge that MZer does not direct the Platform or Services to children younger than 13
                years of age.
              </Typography>
            </div>
          </li>
          <li className={styles.article}>
            <Typography variant={'h6'} className={styles.text}>
              <Typography variant={'h6'} className={styles.subtitle}>
                License to Use our App
              </Typography>
              Subject to this Agreement and to any additional terms and conditions related to our App, MZer hereby
              grants Users, during the term of this Agreement, a limited, non-exclusive, non-transferable, revocable
              license (“License”) to download and install a copy of the App on a single mobile device the User owns or
              controls, and to run that copy of the App solely for the User’s personal use. We reserve all rights in and
              to the App not expressly granted to Users under this License. This License terminates upon termination of
              this Agreement for any reason.
            </Typography>
          </li>
          <li className={styles.article}>
            <Typography variant={'h6'} className={styles.text}>
              <Typography variant={'h6'} className={styles.subtitle}>
                Fees
              </Typography>
              In consideration for using our Services and the License to use our App, you agree to pay all fees
              specified by our Platform, as we may, in our sole discretion, change from time to time (the “Fees”). You
              authorize us to charge your stored payment method in order to collect any Fees due in connection with your
              use of our Services.
            </Typography>
          </li>
          <li>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.subtitle}>
                User Information; Privacy Policy
              </Typography>
              <Typography variant={'h6'} className={styles.text}>
                Our Privacy Policy explains how we collect and use your information and how we protect your privacy when
                you use our Platform and Services. By using our Platform and Services, you agree that MZer may use
                your information in accordance with our Privacy Policy. MZer makes commercially reasonable efforts
                to collect and use your information securely and in accordance with the Privacy Policy and applicable
                law.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                You acknowledge that you are solely responsible for the completeness and accuracy of any information you
                provide to us. Although we disclaim any legal duty to verify the accuracy of any information you provide
                to us when creating an account, if we believe any information you provide is not current, complete, and
                accurate, we have the right to refuse access to our Platform and Services. To protect your MZer
                account, keep your password confidential. You acknowledge that you are solely responsible for any
                activity that happens on or through your MZer account, whether or not you authorized such activity.
                If you learn of any unauthorized use of your MZer account or password, or any other breach of
                security related to your account, you must contact us at Support@MZer.com. We are not liable for
                any loss you or another party may incur as a result of someone else using your account or password
                without your knowledge. However, you may be held liable for losses incurred by MZer or another
                party as a result of someone else using your account or password. You may not use anyone else’s account
                at any time. Your failure to provide us complete and accurate information, to protect your MZer
                account and password, or to report unauthorized use of your MZer account or password may constitute
                a Prohibited Act or breach of this Agreement.
              </Typography>
            </div>
          </li>
          <li>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.subtitle}>
                Using our Platform and Services
              </Typography>
              <Typography variant={'h6'} className={styles.text}>
                In addition to complying with these User Terms of Use, you must comply with any additional policies made
                available to you within our Platform or Services. You may use our Platform and Services, and any content
                accessed through them, only as permitted by and in compliance with applicable laws, including but not
                limited to privacy laws, intellectual property laws, and regulatory requirements.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                You may not use our Platform or Services other than as expressly permitted by this Agreement. You may
                not misuse our Platform or Services or use our Platform or Services in any manner that violates any law
                or violates or infringes the rights of any party. You may not attempt to access our Platform or Services
                using a method other than the interfaces and instructions we provide. You may not attempt to damage,
                corrupt, tamper with, or infect our Platform or Services or any of our information or telecommunication
                systems with viruses or other malicious computer programs.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                You agree that you will not, nor will you permit anyone else to, directly or indirectly (a) use manual
                or automated software, devices, scripts robots, crawlers, browser plugins or add-ons, or any other means
                or processes to access, index, survey, scrape, crawl, spider, or otherwise data mine our Platform or
                Services or any related information; use bots or other automated methods to access our Platform or
                Services; monitor our Platform or Services’ availability, performance, or functionality for any
                competitive purpose; engage in “framing”, “mirroring”, or otherwise simulating the appearance or
                function of our Platform or Services; override any security feature of our Platform or Services; (b)
                interfere with the operation of, or place an unreasonable load on, our Platform or Services, by means
                including but not limited to spam, denial of service attack, viruses, gaming algorithms; (c) collect,
                copy, modify, reproduce, translate, localize, port, or otherwise create or use derivatives or copies of
                any part of our Platform or Services or any information from MZer, except as expressly permitted
                under this Agreement; (d) transfer, rent, lease, lend, resell, distribute, sublicense, sell, transfer,
                or otherwise use or commercially exploit our Platform or Services or any related information; (e)
                reverse engineer, disassemble, decompile, or otherwise attempt to discover the source code or underlying
                algorithms of all or any part of our Platform or Services; (f) remove or alter any copyright, trademark,
                or other intellectual property or proprietary notices or labels on or in our Platform or Services, any
                other intellectual property of MZer, or any other element of our Platform or Services, in whole or
                in part, except as and only to the extent any of the forgoing restrictions are prohibited by applicable
                law or to the extent as may be permitted by the licensing terms governing use of any open sourced
                components included with the App; (g) use the App in any manner inconsistent with its design.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                Any of the foregoing shall be deemed a “Prohibited Act.” Any use of MZer’s Platform or Services in
                any manner deemed a Prohibited Act here or elsewhere in this Agreement is a breach of this Agreement.
              </Typography>
            </div>
          </li>
          <li className={styles.nested}>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                <Typography variant={'h6'} className={styles.subtitle}>
                  Intellectual Property
                </Typography>
                MZer and its licensors, if any, own and retain all proprietary rights to MZer, the Platform
                and Services, all software and other technology relating to the Platform and Services, and all text,
                images, data, information, and other content (collectively, the “MZer Content”) including all
                intellectual property rights therein, displayed, available, or appearing on the Platform. The software
                coding and the look and feel of our Platform and Services are copyrighted by and the property of
                MZer and all rights are reserved to MZer.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                MZer Content is protected under both United States and foreign laws and unauthorized use of
                MZer Content may violate copyright, trademark, and other laws. Furthermore, elements of our
                Platform or Services are protected by trade dress, trademark, unfair competition, and other state and
                federal laws, and may not be copied or imitated in whole or in part, by any means, including but not
                limited to, the use of framing or mirrors. None of the MZer Content may be retransmitted without
                our express, written consent for each and every instance. You have no rights in or to MZer Content,
                and you may not use MZer Content except as permitted under this Agreement. No other use is
                permitted without prior written consent from us. You must retain all copyright and other proprietary
                notices contained in the original MZer Content. You may not sell, transfer, assign, license,
                sublicense, or modify MZer Content or reproduce, display, publicly perform, make a derivative
                version of, distribute, or otherwise use MZer Content in any way for any public or commercial
                purpose. The use or posting of MZer Content on any other website or in a networked computer
                environment for any purpose is expressly prohibited.
              </Typography>
            </div>
            <ol>
              <li className={styles.article}>
                <Typography variant={'h6'} className={styles.text}>
                  Trademarks. The trademarks, service marks, and logos of MZer (the “MZer Trademarks”)
                  located, used, or displayed on the Platform or Services are registered and unregistered trademarks or
                  service marks of MZer. Other company, product, and service names located, used, or displayed in
                  connection with the Platform or Services may be trademarks or service marks owned by third parties
                  (the “Third-Party Trademarks,” and, collectively with the MZer Trademarks, the “Trademarks”). The
                  offering of the Platform or Services shall not be construed as granting, by implication, estoppel, or
                  otherwise, any license or right to use any Trademark displayed in connection with the Platform or
                  Services without our prior written permission specific for each such use. The Trademarks may not be
                  used to disparage MZer, any third party, or such third party’s products or services, or in any
                  manner that may damage any goodwill in the Trademarks. Use of any Trademarks as part of a link to or
                  from any site is prohibited unless MZer approves the establishment of such a link by prior
                  written consent specific for each such link. All goodwill generated from the use of any MZer
                  Trademark shall inure to MZer’s benefit.
                </Typography>
              </li>
              <li className={styles.article}>
                <Typography variant={'h6'} className={styles.text}>
                  Patents; Copyrights. A number of issued patents and patents pending may apply to the Platform or
                  Services. The Platform and Services are also protected by copyrights owned by MZer and/or third
                  parties. If you copy portions of the Platform or Services you are violating these patent rights and
                  copyrights.
                </Typography>
                <Typography variant={'h6'} className={styles.text}>
                  Violation of any part of this section is a Prohibited Act, and such violation shall terminate your
                  permission to access and use MZer Content and the Platform and Services, and you must immediately
                  destroy any copies you have made of MZer Content.
                </Typography>
              </li>
            </ol>
          </li>
          <li>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                <Typography variant={'h6'} className={styles.subtitle}>
                  User Generated Content
                </Typography>
                Users may post, create, upload, submit, store, send, or receive content to or through our Platform or
                Services (“User Generated Content”).
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                You expressly acknowledge and agree that once you submit User Generated Content to or through our
                Platform or Services, you give MZer and those we work with a worldwide, royalty-free, perpetual,
                transferable, irrevocable, sub-licensable, non-exclusive right and license to copy, record, synchronize,
                transmit, format, host, store, reproduce, modify, compile, combine with other content, adapt, translate,
                sell, create derivative works of, communicate, publish, perform, display, promote, link to, distribute,
                and otherwise use or exploit, in any form or media, such User Generated Content. The rights you grant us
                in this license are for the limited purpose of operating, promoting, and improving our Platform and
                Services, and developing new ones. You hereby waive any and all moral right to use the name you submit
                with your User Generated Content. You represent and warrant that you have the necessary rights, power,
                and authority to grant us this license. This license continues even after you stop using our Platform or
                Services.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                MZer does not claim, and you do not transfer, any ownership rights in any of your User Generated
                Content and nothing in this Agreement restricts any rights you may have to use and exploit your User
                Generated Content outside of our Platform and Services. You retain ownership of any intellectual
                property rights that you hold in your User Generated Content.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                You represent and warrant that your User Generated Content does not infringe, violate, misappropriate,
                or otherwise conflict with the rights of any third party, including but not limited to privacy and
                intellectual property rights, and that your User Generated Content complies with all applicable laws and
                regulations. You further represent and warrant that the use of your User Generated Content by MZer
                or its affiliates as permitted by this Agreement does not and will not infringe, violate,
                misappropriate, or otherwise conflict with the rights of any third party.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                You expressly acknowledge and agree that once you submit User Generated Content to or through our
                Platform or Services, it will be accessible by others, and you have no expectation of or right to
                confidentiality or privacy with respect to such User Generated Content, including but not limited to,
                any personally identifying information that you may make available, and that your User Generated Content
                may be disclosed through the Platform or Services to unknown persons and without control by MZer.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                You expressly acknowledge and agree that you, and not MZer, are entirely responsible for User
                Generated Content that you post, create, upload, submit, store, send, or receive to or through our
                Platform or Services and that your User Generated Content does not contain any libelous, defamatory, or
                obscene material or other content that violates the terms of this Agreement. We do not endorse any User
                Generated Content and nothing in this Agreement obligates us to use any User Generated Content. We may
                remove User Generated Content that violates the terms of this Agreement, or that is offensive or
                otherwise unacceptable to us in our sole discretion.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                Violation of any part of this section is a Prohibited Act, and such violation may terminate your
                permission to access and use MZer Content and the Platform and Services.
              </Typography>
            </div>
          </li>
          <li>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                <Typography variant={'h6'} className={styles.subtitle}>
                  Other Content and Services
                </Typography>
                Our Platform or Services might enable or require access to or use of other services and software of
                MZer or third parties (collectively, “Other Services”). You hereby acknowledge that use of our
                Platform and Services may be subject to your acceptance of additional or different terms of use, terms
                of service, licenses, or similar agreements related to such Other Services.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                Our Platform or Services might display content that is not MZer’s. This content is the sole
                responsibility of the entity that makes it available. We may, but we are not required to, review content
                to determine whether it is illegal or violates our policies, and we may remove or refuse to display
                content that we reasonably believe violates our policies or the law.
              </Typography>
            </div>
          </li>
          <li>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                <Typography variant={'h6'} className={styles.subtitle}>
                  Unavailability
                </Typography>
                We may alter, suspend, or discontinue our Platform or Services in whole or in part, at any time and for
                any reason, with or without notice. In addition, one or more features of the Platform or Services may be
                temporarily unavailable from time to time for maintenance or some other purpose.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                We may, in our sole discretion, terminate or suspend a User’s access to our Platform or ability to use
                our Services, in whole or in part, at any time for any reason, with or without notice, including but not
                limited to a breach or suspected breach of this Agreement or a violation or suspected violation of law
                by the User. If MZer notifies a User that the User’s access to our Platform or ability to use our
                Services is terminated or suspended, such User shall immediately cease and desist from all such access
                or use.
              </Typography>
            </div>
          </li>
          <li className={styles.article}>
            <Typography variant={'h6'} className={styles.text}>
              <Typography variant={'h6'} className={styles.subtitle}>
                Term, Termination, Survival
              </Typography>
              This Agreement is effective on the earlier of (i) the date you accept this Agreement, or (ii) the date you
              first register, access, or use our Platform or Services, and will continue until terminated in accordance
              with this Agreement. This Agreement automatically terminates upon (i) your breach of this Agreement, or
              (ii) your failure to comply with any terms or conditions of this Agreement or any MZer policy, as
              determined by MZer in its sole discretion, or (iii) your performance of any Prohibited Act described
              or defined herein. MZer may terminate this Agreement at any time for any reason, with or without
              notice. You may terminate this Agreement at any time by ceasing to use the Platform and Services and by
              deleting or otherwise destroying all full or partial copies of the App. Upon termination of this Agreement
              for any reason, you shall cease all use of the Platform and Services and delete or otherwise destroy all
              full or partial copies of the App. Sections of this Agreement titled “Intellectual Property,” “User
              Generated Content,” “Term, Termination, Survival,” “No Endorsement,” “Disclaimers,” “Limitation of
              Liability,” “Release; Indemnification,” “Dispute Resolution,” and “General” shall survive any termination
              of this Agreement.
            </Typography>
          </li>
          <li>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                <Typography variant={'h6'} className={styles.subtitle}>
                  No Pharmacy-Patient or Doctor-Patient Relationship; No Medical Advice
                </Typography>
                You expressly acknowledge and agree that (1) MZer is not a pharmacy or healthcare provider; (2)
                MZer does not provide any medical or other professional advice, opinion, diagnosis, or treatment,
                or otherwise engage in the practice of pharmacy or medicine in connection with our Platform or Services;
                and (3) using the Platform or Services does not create any pharmacy-patient or doctor-patient
                relationship between you and MZer. You further expressly acknowledge and agree that your reliance
                on any information provided by MZer is solely at your own risk.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                You expressly acknowledge and agree that your healthcare provider is solely responsible for transmitting
                complete and accurate prescription information to a pharmacy in accordance with your instructions. You
                further expressly acknowledge and agree that you are solely responsible for (1) ensuring that all
                prescriptions delivered to you through our Platform and Services were properly fulfilled; (2) consuming
                all such prescriptions in accordance with instructions or directions provided by your healthcare
                provider and the pharmacist dispensing your prescriptions; and (3) storing all prescriptions delivered
                to you through our Platform and Services in accordance with the guidelines provided by your healthcare
                provider, the pharmacist dispensing your prescriptions, and the manufacturer of such prescription drugs.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                MZer does not recommend or endorse any specific products, services, physicians, tests, procedures,
                opinions, or other information that may be available on our Platform.
              </Typography>
            </div>
          </li>
          <li className={styles.article}>
            <Typography variant={'h6'} className={styles.text}>
              <Typography variant={'h6'} className={styles.subtitle}>
                Authorization to Transfer Prescriptions to Preferred Pharmacies
              </Typography>
              If your prescription has been transmitted to or filled at a pharmacy that does not participate in the
              MZer Preferred Network (a “Non-preferred Pharmacy”), we may offer you the option to have your
              prescription transferred to and filled at a pharmacy within the MZer Preferred Network (a “Preferred
              Pharmacy”). By using our Platform or Services, you hereby authorize us facilitate the transfer of your
              prescription(s) from any Non-Preferred Pharmacy to any Preferred Pharmacy.
            </Typography>
          </li>
          <li className={styles.article}>
            <Typography variant={'h6'} className={styles.text}>
              <Typography variant={'h6'} className={styles.subtitle}>
                No Endorsement
              </Typography>
              MZER DOES NOT ENDORSE OR RECOMMEND ANY PHARMACY, HEALTHCARE PROVIDER, OR PRESCRIPTION DRUG. MZER
              DOES NOT MAKE ANY GUARANTEES, REPRESENTATIONS, OR WARRANTIES, WHETHER EXPRESS OR IMPLIED, WITH RESPECT TO
              THE PROFESSIONAL QUALIFICATIONS, EXPERTISE, QUALITY OF WORK, OR ANY INFORMATION PROVIDED TO YOU BY ANY
              THIRD PARTY. YOU ACKNOWLEDGE THAT IN NO EVENT SHALL MZER BE LIABLE TO YOU OR ANY OTHER PARTY FOR ANY
              DECISION MADE OR ACTION TAKEN OR NOT TAKEN BY YOU OR ANY OTHER PARTY IN RELIANCE ON ANY SUCH INFORMATION.
            </Typography>
          </li>
          <li className={styles.article}>
            <Typography variant={'h6'} className={styles.text}>
              <Typography variant={'h6'} className={styles.subtitle}>
                Disclaimers
              </Typography>
              YOU UNDERSTAND AND AGREE THAT THE PLATFORM AND SERVICES ARE PROVIDED SOLELY ON AN “AS IS” AND “AS
              AVAILABLE” BASIS. NEITHER MZER NOR ANY OF MZER’S LICENSORS MAKE ANY EXPRESS REPRESENTATIONS OR
              WARRANTIES OF ANY KIND AND EACH OF THEM DISCLAIMS ALL IMPLIED REPRESENTATIONS AND WARRANTIES OF ANY KIND,
              INCLUDING BUT NOT LIMITED TO WARRANTIES OF ACCURACY, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              TITLE, NON-INFRINGEMENT, RESULTS, COMPLETENESS, ACCESSIBILITY, COMPATIBILITY, EFFECTIVENESS, COMPLIANCE
              WITH LAWS OR GOVERNMENT RULES OR REGULATIONS, OR THAT ANY FEATURE OF THE PLATFORM OR SERVICES WILL OPERATE
              ERROR-FREE, THAT DATA WILL NOT BE LOST, SECURITY, OR THAT ANY FEATURE OF THE PLATFORM OR SERVICES IS FREE
              OF VIRUSES OR HARMFUL CODES. WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, NEITHER MZER NOR ANY
              OF MZER’S LICENSORS MAKE ANY WARRANTY THAT THE CONTENT OF PLATFORM OR SERVICES SATISFIES GOVERNMENT
              REGULATIONS REQUIRING DISCLOSURE OF INFORMATION ON PRESCRIPTION DRUG PRODUCTS. THE PLATFORM OR SERVICES
              MAY BE SUBJECT TO LIMITATIONS, DELAYS, AND OTHER PROBLEMS INHERENT IN THE USE OF COMPUTER SOFTWARE AND
              HARDWARE, THE NTERNET, AND ELECTRONIC COMMUNICATIONS. MZER IS NOT RESPONSIBLE FOR ANY DELAYS,
              DELIVERY FAILURES, OR DAMAGE OF ANY KIND RESULTING FROM SUCH LIMITATIONS, DELAYS, AND OTHER PROBLEMS,
              INCLUDING BUT NOT LIMITED TO ANY LOST DATA OR CONTENT, LOST PROFITS, BUSINESS INTERRUPTION, OR FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY OR PUNITIVE DAMAGES. IN NO EVENT SHALL MZER
              BE LIABLE FOR ANY LOSS OR DAMAGE, DELAY IN PERFORMANCE, OR NONPERFORMANCE CAUSED BY EQUIPMENT MALFUNCTION
              OR BREAKDOWN, NETWORK OR PIPELINE DISRUPTION, SEVERE WEATHER CONDITIONS, INFORMATION UNAVAILABILITY,
              STRIKES OR OTHER LABOR DISPUTES, RIOTS, FIRE, INSURRECTION, WAR, FAILURE OF CARRIERS, ACCIDENTS, ACTS OF
              GOD, OR ANY OTHER CAUSES BEYOND MZER’S CONTROL. MZER HEREBY EXPRESSLY DISCLAIMS ANY
              REPRESENTATION OR WARRANTY, WHETHER EXPRESSED OR IMPLIED, REGARDING ANY PHARMACY OR HEALTHCARE PROVIDER’S
              QUALIFICATIONS, EXPERTISE, QUALITY OF WORK, OR ACCURACY IN FULFILLING ANY USER’S PRESCRIPTIONS OR
              DIAGNOSING OR TREATING ANY MEDICAL CONDITION. MZER HEREBY EXPRESSLY DISCLAIMS ANY LIABILITY FOR ANY
              INCORRECTLY PROCESSED PRESCRIPTIONS BY ANY PHARMACY OR ANY INACCURATE INFORMATION PROVIDED BY ANY USER OR
              BY ANY USER’S HEALTHCARE PROVIDER. MZER HEREBY EXPRESSLY DISCLAIMS ANY LIABILITY FOR CANCELLED OR
              OTHERWISE UNFULFILLED OR UNDELIVERED ORDERS FOR PRESCRIPTION DRUGS OR ANY INJURY OR DEATH RESULTING
              THEREFROM. IF APPLICABLE LAW DOES NOT ALLOW THE EXCLUSION OF SOME OR ALL OF THE ABOVE IMPLIED WARRANTIES
              TO APPLY TO YOU, THE ABOVE EXCLUSIONS WILL APPLY TO YOU TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW.
            </Typography>
          </li>
          <li>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                <Typography variant={'h6'} className={styles.subtitle}>
                  Limitation of Liability
                </Typography>
                IF YOU ARE DISSATISFIED WITH THE PLATFORM OR SERVICES OR ANY OF MZER’S TERMS, CONDITIONS, RULES,
                POLICIES, GUIDELINES, OR PRACTICES, OR OTHERWISE HAVE A DISPUTE WITH MZER, YOUR SOLE AND EXCLUSIVE
                REMEDY IS TO TERMINATE THIS AGREEMENT AND DISCONTINUE USING OUR PLATFORM AND SERVICES. WITHOUT LIMITING
                THE GENERALITY OF THE FOREGOING, MZER SHALL NOT BE LIABLE UNDER ANY CIRCUMSTANCES OR UNDER ANY
                LEGAL THEORY, WHETHER IN TORT, CONTRACT, OR OTHERWISE, WITH RESPECT TO THE PLATFORM OR SERVICES, OR ANY
                OTHER SUBJECT MATTER OF THIS AGREEMENT, FOR (A) ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                PUNITIVE OR EXEMPLARY DAMAGES, INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOST DATA OR CONTENT, LOSS OF
                PROFITS, WORK STOPPAGE, BUSINESS INTERRUPTION, MEDICAL MALPRACTICE OR NEGLIGENCE OF ANY HEALTHCARE
                PROVIDER, PHARMACY, OR OTHER PARTY UTILIZED THROUGH USE OF THE PLATFORM OR SERVICES, EVEN IF MZER
                HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, (B) THE COST OF PROCUREMENT OF SUBSTITUTE SERVICES,
                (C) ANY USER GENERATED CONTENT, AS DEFINED IN THIS AGREEMENT, OR ANY CONTENT OF ANY OTHER USER OF THE
                SERVICES, OR (D) ANY MATTERS BEYOND MZER’S REASONABLE CONTROL. THE MAXIMUM AGGREGATE LIABILITY OF
                MZER FOR ALL DAMAGES, LOSSES, LIABILITIES, COSTS AND EXPENSES UNDER ANY LEGAL THEORY, WHETHER IN
                TORT, CONTRACT, OR OTHERWISE, WITH RESPECT TO, ARISING OUT OF OR RELATED TO THE PLATFORM OR SERVICES, OR
                ANY OTHER SUBJECT MATTER OF THIS AGREEMENT SHALL BE LIMITED TO THE FEES THAT YOU PAID US IN THE THREE
                (3) MONTH PERIOD IMMEDIATELY PRECEDING THE CIRCUMSTANCES GIVING RISE TO YOUR CLAIM OR IF PAID NO SUCH
                FEES, ONE HUNDRED U.S. DOLLARS ($100). THE LIMITATIONS AND DISCLAIMERS IN THIS SECTION DO NOT PURPORT TO
                LIMIT LIABILITY OR ALTER YOUR RIGHTS AS A CONSUMER THAT CANNOT BE EXCLUDED UNDER APPLICABLE LAW.
              </Typography>
            </div>
          </li>
          <li>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                <Typography variant={'h6'} className={styles.subtitle}>
                  Release; Indemnification
                </Typography>
                You expressly acknowledge and agree that MZer has no special relationship with or fiduciary duty to
                you and that MZer has no control over any services provided to you by any pharmacy or healthcare
                provider. You, for and behalf of you and your heirs, administrators, executors, successors, and assigns
                (the “Releasing Parties”) hereby agree to release, waive, and discharge all claims which may arise
                against MZer and its affiliates, officers, directors, employees, contractors, and licensors (the
                “Released Parties”), including claims based on any Released Party’s alleged or actual negligence, breach
                of this Agreement, or breach of any express or implied warranty, arising out of or related to the
                Platform or Services or this Agreement. Released Parties shall not be liable to Releasing Parties for
                any damages, whether direct, indirect, incidental, consequential, or otherwise, losses, liabilities,
                costs and expenses of every kind and nature, known and unknown, arising out of or in any way related to
                the Platform and Services or this Agreement.
              </Typography>
            </div>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                You agree to indemnify, defend, and hold harmless MZer and its affiliates, officers, directors,
                employees, contractors, and licensors from any and all claims, demands, losses, liabilities, and
                expenses, including attorneys’ fees, arising out of or in connection with (i) your use of the Platform
                or Services or prescriptions obtained through your use of the Platform or Services; (ii) your breach of
                violation of this Agreement; (iii) a Released Party’s use of your User Generated Content; or (iv) your
                violation of the rights of any third party.
              </Typography>
            </div>
          </li>
          <li className={styles.nested}>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                <Typography variant={'h6'} className={styles.subtitle}>
                  Dispute Resolution
                </Typography>
                If you have a question or concern about our Platform or Services, please contact us first. We will try
                to answer your question or resolve your concern.
              </Typography>
            </div>
            <ol>
              <li className={styles.article}>
                <Typography variant={'h6'} className={styles.text}>
                  Binding Arbitration. In the unlikely event that MZer is unable to resolve your concerns, you
                  agree that any dispute, claim or controversy arising out of or relating to this Agreement or the
                  breach, termination, enforcement, interpretation or validity thereof or the use of the Platform or
                  Services (collectively, "Disputes") will be settled by binding arbitration between you and MZer,
                  except that each party retains the right to bring an individual action in small claims court and the
                  right to seek injunctive or other equitable relief in a court of competent jurisdiction to prevent the
                  actual or threatened infringement, misappropriation or violation of a party's copyrights, trademarks,
                  trade secrets, patents or other intellectual property rights. You acknowledge and agree that you and
                  MZer are each waiving the right to a trial by jury or to participate as a plaintiff or class in
                  any purported class action or representative proceeding. Further, unless both you and MZer
                  otherwise agree in writing, the arbitrator may not consolidate more than one person's claims, and may
                  not otherwise preside over any form of any class or representative proceeding. If this specific
                  paragraph is held unenforceable, then the entirety of this "Dispute Resolution" section will be deemed
                  void. Except as provided in the preceding sentence, this "Dispute Resolution" section will survive any
                  termination of this Agreement.
                </Typography>
              </li>
              <li className={styles.article}>
                <Typography variant={'h6'} className={styles.text}>
                  Arbitration Rules and Governing Law. The arbitration will be administered by the American Arbitration
                  Association ("AAA") in accordance with the Commercial Arbitration Rules and the Supplementary
                  Procedures for Consumer Related Disputes (the "AAA Rules") then in effect, except as modified by this
                  "Dispute Resolution" section. (The AAA Rules are available at www.adr.org/arb_med or by calling the
                  AAA at 1-800-778-7879.) The Federal Arbitration Act will govern the interpretation and enforcement of
                  this section.
                </Typography>
              </li>
              <li className={styles.article}>
                <Typography variant={'h6'} className={styles.text}>
                  Arbitration Process. A party who desires to initiate arbitration must provide the other party with a
                  written Demand for Arbitration as specified in the AAA Rules. The arbitrator will be either a retired
                  judge or an attorney licensed to practice law in the state of Florida and will be selected by the
                  parties from the AAA's roster of consumer dispute arbitrators. If the parties are unable to agree upon
                  an arbitrator within seven (7) days of delivery of the Demand for Arbitration, then the AAA will
                  appoint the arbitrator in accordance with the AAA Rules
                </Typography>
              </li>
              <li className={styles.article}>
                <Typography variant={'h6'} className={styles.text}>
                  Arbitration Location and Procedure. Unless you and MZer otherwise agree, the arbitration will be
                  conducted in Hillsborough County, Florida. If your claim does not exceed $10,000, then the arbitration
                  will be conducted solely on the basis of documents you and MZer submit to the arbitrator, unless
                  you request a hearing or the arbitrator determines that a hearing is necessary. If your claim exceeds
                  $10,000, your right to a hearing will be determined by the AAA Rules. Subject to the AAA Rules, the
                  arbitrator will have the discretion to direct a reasonable exchange of information by the parties,
                  consistent with the expedited nature of the arbitration.
                </Typography>
              </li>
              <li className={styles.article}>
                <Typography variant={'h6'} className={styles.text}>
                  Arbitrator’s Decision. The arbitrator will render an award within the time frame specified in the AAA
                  Rules. The arbitrator's decision will include the essential findings and conclusions upon which the
                  arbitrator based the award. Judgment on the arbitration award may be entered in any court having
                  jurisdiction thereof. The arbitrator's award damages must be consistent with the terms of the
                  "Limitation of Liability" section above as to the types and the amounts of damages for which a party
                  may be held liable. The arbitrator may award declaratory or injunctive relief only in favor of the
                  claimant and only to the extent necessary to provide relief warranted by the claimant's individual
                  claim.
                </Typography>
              </li>
              <li className={styles.article}>
                <Typography variant={'h6'} className={styles.text}>
                  Fees. Payment of all filing, administration, and arbitrator costs and expenses imposed by AAA will be
                  governed by the AAA rules, provided that if you are initiating an arbitration against MZer and
                  the value of the relief sought is ten thousand dollars ($10,000) or less, then MZer will advance
                  all filing, administrative and arbitration costs and expenses imposed by AAA (subject to reimbursement
                  as set forth below). If the circumstances in the preceding sentence apply, but the value of relief
                  sought is more than ten thousand dollars ($10,000) and you demonstrate to the arbitrator that such
                  costs and expenses would be prohibitively more expensive than a court proceeding, then MZer will
                  pay the amount of any such costs and expenses that the arbitrator determines are necessary to prevent
                  the arbitration from being prohibitively more expensive than a court proceeding, subject to
                  reimbursement as set forth below. In the event that the arbitrator determines that all of the claims
                  you assert in arbitration are frivolous according to Federal Rule of Civil Procedure 11, you agree to
                  reimburse MZer for all such costs and expenses that MZer paid and that you would have been
                  obligated to pay under the AAA rules. Just as in any court proceeding, each party will initially bear
                  its own attorneys’ fees and expenses in connection with any arbitration. Should either party be
                  determined to have substantially prevailed in the arbitration, then upon such party’s request, the
                  arbitrator shall award such prevailing party the reasonable attorneys’ fees and expenses that it
                  incurred in connection with the arbitration, provided that to the extent that the dispute or claim
                  relates to your personal use of the Platform or Services, rather than business use. The arbitrator may
                  make rulings and resolve disputes as to the reimbursement of attorneys’ fees and expenses upon request
                  from either party made within fourteen (14) days of the arbitrator’s ruling on the merits.
                </Typography>
              </li>
              <li className={styles.article}>
                <Typography variant={'h6'} className={styles.text}>
                  Changes. Notwithstanding any modification-related provisions herein, if MZer changes this
                  "Dispute Resolution" section after the date you first accepted this Agreement, or accepted any
                  subsequent changes to this Agreement, you may reject any such change by providing MZer written
                  notice of such rejection by mail or hand delivery to: MZer, LLC, Attn: CEO, 601 N. Ashley Dr,
                  Suite 1100-93591, Tampa, Florida 33602, or by email from the email address associated with your
                  account to Support@MZer.com, within 30 days of the date such change became effective, as
                  indicated in the "Last update" date above. In order to be effective, the notice must include your full
                  name and clearly indicate your intent to reject changes to this "Dispute Resolution" section. By
                  rejecting changes, you are agreeing that you will arbitrate any Dispute between you and MZer in
                  accordance with the provisions of this "Dispute Resolution" section as of the date you first accepted
                  this Agreement, or accepted any subsequent changes to this Agreement.
                </Typography>
              </li>
            </ol>
          </li>
          <li className={styles.nested}>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.subtitle}>
                Dispute Resolution
              </Typography>
            </div>
            <ol>
              <li className={styles.article}>
                <Typography variant={'h6'} className={styles.text}>
                  Notices. All notices under this Agreement shall be in writing and shall be delivered in person, or by
                  registered or certified mail, return receipt requested, or sent by a nationally recognized overnight
                  delivery service. If to MZer, all notices shall be sent to MZer, LLC Attn: CEO, 601 N.
                  Ashley Dr, Suite 1100-93591, Tampa, Florida 33602. If to a User, all notices shall be sent to the
                  User’s mailing address or email address provided to MZer by the User when signing up to use the
                  Platform or Services or installing the App. Notices by registered or certified mail shall be deemed
                  delivered five days after mailing, and notices by overnight courier shall be deemed delivered one day
                  after deposit with such courier. Notices by MZer to a User by email shall be deemed delivered
                  when received.
                </Typography>
              </li>
              <li className={styles.article}>
                <Typography variant={'h6'} className={styles.text}>
                  Severability. If any provision of this Agreement is held to be unenforceable for any reason, it shall
                  be adjusted rather than voided, if possible, in order to achieve the intent of the parties to the
                  extent possible. In any event, all other provisions of this Agreement shall be deemed valid and
                  enforceable to the fullest extent possible.
                </Typography>
              </li>
              <li className={styles.article}>
                <Typography variant={'h6'} className={styles.text}>
                  Waiver. No failure or delay by MZer to insist upon the strict performance of any term, condition,
                  or covenant of this Agreement, or to exercise any right, power, or remedy under this Agreement shall
                  constitute a waiver of any such term, condition, covenant, right, power, or remedy of any breach, or
                  preclude MZer from exercising any such right, power, or remedy at any later time.
                </Typography>
              </li>
              <li className={styles.article}>
                <Typography variant={'h6'} className={styles.text}>
                  Assignment. Users may not assign this Agreement or any rights or obligations under this Agreement, by
                  operation of law or otherwise, without MZer’s prior written consent. MZer may assign this
                  Agreement, in whole or in part, and any rights or obligations under this Agreement, without
                  restriction, with or without notice.
                </Typography>
              </li>
              <li className={styles.article}>
                <Typography variant={'h6'} className={styles.text}>
                  Entire Agreement. This Agreement contains the entire agreement between MZer and Users regarding
                  the terms of Users’ use of the Platform and Services and supersedes any prior written or oral
                  agreements between MZer and any User.
                </Typography>
              </li>
              <li className={styles.article}>
                <Typography variant={'h6'} className={styles.text}>
                  Amendment. MZer may amend, modify, or supplement (each, a “Change”) this Agreement at any time by
                  posting the changed version of these User Terms of Use on the Platform and/or by providing
                  notification through the App. This Agreement may not be otherwise amended except in a writing signed
                  by MZer and a User. A User’s continued use of the Platform or Services following MZer’s
                  posting of any Change on the Platform and/or providing notification through the App constitutes the
                  User’s acceptance of such Change. If a User does agree with the terms of any Change, the User’s sole
                  remedy is to cease using the Platform and Services and to delete or otherwise destroy all full or
                  partial copies of the App.
                </Typography>
              </li>
              <li className={styles.article}>
                <Typography variant={'h6'} className={styles.text}>
                  Choice of Law; Forum. This Agreement, and all matters arising out of this Agreement, shall be governed
                  by and construed in accordance with laws of the State of Florida, without regard to any conflict of
                  laws principles.
                </Typography>
              </li>
            </ol>
          </li>
          <li>
            <div className={styles.article}>
              <Typography variant={'h6'} className={styles.text}>
                <Typography variant={'h6'} className={styles.subtitle}>
                  Contact information
                </Typography>
                If you have any questions, concerns, or comments about these User Terms of Use or our Privacy Policy,
                you may contact us using the information below:
                <br />
                <br />
                MZer, LLC
                <br />
                Attn: CEO
                <br />
                601 N. Ashley Dr
                <br />
                Suite 1100-93591
                <br />
                Tampa, Florida 33602
                <br />
                Last Updated: This End User Terms of Use was last updated on July 26, 2019.
              </Typography>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};
