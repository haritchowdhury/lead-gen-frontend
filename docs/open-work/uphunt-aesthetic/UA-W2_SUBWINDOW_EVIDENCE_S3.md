# UA-W2 append-only sub-window evidence (`S3`)

Append-only. Evidence cannot amend a task, decision, or authority boundary. Companion
artifacts: `S1` `frontend/docs/open-work/uphunt-aesthetic/UA-W2_SUBWINDOW_DECOMPOSITION_S1.md`
(revision `fe25229d5bb48acf2b3bcf8a1fa699c8ea6b41c9170daf847cee453054f86d89`) and
`S2` `frontend/docs/open-work/uphunt-aesthetic/UA-W2_SUBWINDOW_STATE_S2.yaml`
(revision `4b2bba9db796e0e0ee9acd3ddb03cea7a5865f869730c3e8d2ce46021bb96879`).
Inherited parent package: `A1`–`A8` under `frontend/docs/open-work/uphunt-aesthetic/`,
pinned in `S1` §1.

---

## EV-UA2-D-001 — authority and revision-pin verification

```yaml
evidence_id: EV-UA2-D-001
timestamp: 2026-09-01T18:49:16+05:30
parent_window: UA-W2
subwindow: decomposition-entry-gate (sub-window standard §3)
assignment_id: ASG-UA-W2-01
actor: UA-W2-WINDOW-AGENT (window agent)
frozen_revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract_A1: a33ae1d8af4442de2680dc70f2c6e793a668b1400f0814833489061848c9baef
  decision_A3: 8faaa4e2411235d8a83ec94de6a07e53c54ece91d99121a3c0e09cb6052f4300
  checklist_A4: 626c2a7034c88fc9f2f13e25929801b637aed682cd4c5d521de981c593dc7165
starting_file_digests: A5 cf0c580a8ec4f9f33a6b5ec8cda2f8e73b1ba2e69c0770e24f450c98b8b7cba9; A6 44d7efe1a7821a1578ff0ba421e032436626d11880a103eec04ebc6da7c518f5
commands:
  - sha256sum over both standards and A1/A3/A4/A5/A6 (from /home/harit/Email Scrapper)
  - read A5 (assignment identity, status IN_PROGRESS, authorized/prohibited scopes)
  - read A3 (DEC-UA-002, DEC-UA-006, DEC-UA-007, DEC-UA-008, DEC-UA-011, DEC-UA-013, DEC-UA-014, SCN-UA-001/002, NC-UA-001/002)
  - read A4 (UA-W2 F1, VisualTaskDefaults, Gates, UA-W2-T1..T3, §Coverage rows CASE-UA-W2-001..004, §Enforcement, §Test substitutes, UA-W2 lifecycle boxes)
sandbox_privilege_used: none (read-only)
decisive_results:
  - every recomputed digest equals the pin in the parent assignment message (A1, A3, A4) and in A5
  - A5.current_window=UA-W2; current_assignment_id=ASG-UA-W2-01; assigned_agent=UA-W2-WINDOW-AGENT; current_status=IN_PROGRESS
  - delegation to one-file leaves is authorized (A5 authorized_actions decompose_UA-W2_under_subwindow_standard; S1/S2/S3 in authorized_write_scope)
  - DEC-UA-002 fixes the complete SectionIntro interface; DEC-UA-014 fixes the G2 oracle; DEC-UA-011 fixes recordExecuted import/call discipline
  - no implementation-affecting decision is missing; entry-gate items §3.1–§3.10 all PASS
limitations: none
external_mutations: none
review_disposition: window-agent verified (input to SUBWINDOW-DECOMPOSITION-READY)
```

## EV-UA2-D-002 — working-tree inventory and file-set closure

```yaml
evidence_id: EV-UA2-D-002
timestamp: 2026-09-01T18:49:16+05:30
parent_window: UA-W2
subwindow: decomposition-entry-gate (sub-window standard §3, §4.3)
assignment_id: ASG-UA-W2-01
actor: UA-W2-WINDOW-AGENT (window agent)
commands:
  - git status --porcelain (frontend repo) -> exactly: " M docs/open-work/uphunt-aesthetic/A5_ACTIVE_EXECUTION_STATE.yaml", " M docs/open-work/uphunt-aesthetic/A6_EVIDENCE_LOG.md" (owner-controlled parent assignment writes; PROTECTED)
  - git status --porcelain (coordination root /home/harit/Email Scrapper) -> empty (clean; root ACTIVE_EXECUTION_STATE.md untouched)
  - git log --oneline -4 (frontend) -> head 1975b0f "W1"
  - sha256sum frontend/test/uphunt-aesthetic-coverage.test.ts -> f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1 (predecessor pin holds)
  - sha256sum frontend/components/landing-sections.tsx -> 33f7670852e90b781225f21049e54f275fed93f4f2603c73678064066c0babce (clean, unmodified)
  - ls frontend/components/section-intro.tsx frontend/test/uphunt-aesthetic-w2.test.ts -> both ABSENT
  - test -f frontend/test/.ua-executed.json -> ABSENT
  - node --version -> v24.14.1; package.json scripts test/lint confirmed; tsconfig incremental=true, allowImportingTsExtensions=true, paths @/* present; .gitignore covers *.tsbuildinfo
  - grep app/globals.css -> --color-canvas: #f4f3ed (line 5); --color-ink: #12231e (line 8); --color-signal: #c8f04b (line 13); @media (prefers-reduced-motion: reduce) (line 6258); transition-duration: 0.01ms !important (line 6265)
  - grep landing-sections.tsx -> exactly 3 "<SectionIntro " call sites (lines 98, 111, 145)
sandbox_privilege_used: none (read-only)
decisive_results:
  - starting repository change set = the two PROTECTED docs paths; §4.7 set digest e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
  - planned initial file set = {frontend/components/section-intro.tsx (ABSENT), frontend/components/landing-sections.tsx (33f76708…), frontend/test/uphunt-aesthetic-w2.test.ts (ABSENT)}; planned-file-set digest 1c9285240ded48856d6cddff5088aec458d6c6d70a92c5d54bf4ad3f9c940f4d
  - required changed-file set (from A4 UA-W2 F1 + UA-W2-T1..T3) equals planned initial file set (S1 SW-D03)
  - required W2 case set {CASE-UA-W2-001..004} §4.7 digest 02f920493c7935e2ecd5a3fd3edf1a97450a915add21b63d4183de1a14f449dd; all four oracles verified to pass against current tree bytes (tokens, #c8f04b, reduced-motion, 3 call sites)
  - no unrelated owner-controlled change will be overwritten; no required action exceeds parent authority
limitations: npm test / G2 / lint deliberately not run during decomposition (frozen for UA-W2-I001; running them would mutate test/.ua-executed.json outside coordination writes)
external_mutations: none
review_disposition: window-agent verified (input to SUBWINDOW-DECOMPOSITION-READY)
```

## EV-UA2-D-003 — decomposition authoring, lint, and self-falsification audit

```yaml
evidence_id: EV-UA2-D-003
timestamp: 2026-09-01T18:55:00+05:30
parent_window: UA-W2
subwindow: S1/S2/S3 authoring (sub-window standard §2, §6, §7, §11, §14)
assignment_id: ASG-UA-W2-01
actor: UA-W2-WINDOW-AGENT (window agent)
artifacts_authored:
  S1: frontend/docs/open-work/uphunt-aesthetic/UA-W2_SUBWINDOW_DECOMPOSITION_S1.md revision 722705abcafae622c8badee95ff157741297c11a6b0541f76d307edffd10a368
  S2: frontend/docs/open-work/uphunt-aesthetic/UA-W2_SUBWINDOW_STATE_S2.yaml revision 87d37624946338ac435a9b06ecbd472b230d59d45be15c56674fa40c4b9d5591
  S3: this file (append-only)
commands:
  - grep field-presence lint over S1 FILE blocks: subwindow_id, type, parent_window_id, parent_assignment_id, assigned_agent, predecessors, successor_reserved_for, writable_file, file_operation, starting_file_digest, starting_repository_change_set_digest, read_only_scope, authorized_actions, prohibited_actions, may_start_successor -> 15/15 present in each of UA-W2-S001/S002/S003
  - grep "^subwindow_id:" -> UA-W2-S001, UA-W2-S002, UA-W2-S003, UA-W2-I001 (unique; template line excluded)
decisive_results:
  initial_subwindows: [UA-W2-S001, UA-W2-S002, UA-W2-S003]
  integration_assessment: UA-W2-I001 (authorized_write_file NONE; personally executed)
  dag: S001 -> S002 -> S003 -> I001; acyclic; one owner per file; no parallel waves
  planned_file_set_digest: 1c9285240ded48856d6cddff5088aec458d6c6d70a92c5d54bf4ad3f9c940f4d
  interfaces_frozen_before_dependents: S1 §5.1 (SectionIntro) and §8.3 import contract (recordExecuted)
  intermediate_states: S1 §4.1 (permitted checks, expected states, safety, resolvers, prohibitions)
  document_lint: 15/15 fields per FILE block; 0 unresolved references; 0 placeholders; 0 duplicate IDs
  mandatory_authoring_checklist: 47/47 checked (SW-A01..07, SW-D01..10, SW-E01..08, SW-V01..11, SW-R01..11), each citing EV-UA2-D-001..003
  self_falsification_sweep:
    "two writable files in one sub-window": rejected — S001/S002/S003 each name exactly one file (§6/§7/§8)
    "directory or wildcard writable": rejected — canonical file paths only (§4.7 canonical form)
    "command creating unplanned second workspace file": rejected — leaf commands write only the writable file; tsc leaf runs use --incremental false (no tsbuildinfo); .ua-executed.json is the DEC-UA-011-prescribed disposable runtime file with prescribed cleanup (§8.4 V-D)
    "source and test file assigned together": rejected — section-intro/landing-sections (production) and the w2 test file are three separate ordered sub-windows
    "required parent file absent from decomposition": rejected — planned set equals A4 UA-W2-T1..T3 file set (EV-UA2-D-002)
    "two initial sub-windows own the same file": rejected — one owner per file
    "dependent file begins before interface frozen": rejected — §5.1 frozen before S002 dispatch; S003 predecessors include S001+S002
    "intermediate state with unexplained test failure": rejected — §4.1 freezes expected states; unexpected failures stop for diagnosis
    "subagent starts its successor": rejected — may_start_successor false everywhere; assignment IDs issued only by window agent
    "subagent communicates with parent": rejected — strict adjacency in every prohibited_actions block
    "window agent repairs implementation during review": rejected — §10 item 6
    "integration failure without diagnosed one-file correction": rejected — §10 item 1 requires root-cause + single-file UA-W2-C00n
    "correction silently rewrites a completed sub-window": rejected — §14 append-only amendments
    "coverage case omitted/skipped/duplicated/filtered/unactivated": rejected — §8.3 four tests each call recordExecuted after its oracle; §9 G5 counts; A4 §Enforcement 1–4 inherited
    "oracle weakened to accommodate behavior": rejected — byte-pinned §6.3/§8.3 content; accepted tests (coverage file, design-system-primitives.test.ts) untouched
    "substitute proves more parity than fidelity": rejected — SUB-UA-001 parity limit inherited; file-read oracles only; no computed-pixel claims
    "costly gate repeated without scheduling rule": rejected — npm test/G2/lint frozen at I001 only; leaves run file-local checks (§0.3 scope-relative)
    "correction reuses dependent evidence without proof": rejected — §10 item 4 invalidation + rerun rules
    "assembled changed-file set differs from planned set": rejected — §9 G6 exact-set comparison against the three-file plan
    "window agent claims parent acceptance or starts UA-W3": rejected — S2 next_subwindow STOP; G9 negative search; A5 prohibited start_UA-W3
    "sandbox privilege escalated to parent": rejected — A5 execution_environment_policy grants standing escalation (§10 item 5)
    "changed command or real failure relabelled as sandbox recovery": rejected — §10 item 5 identical-recovery limits
    "parallel leaf overlap": rejected — no waves authorized or compiled
limitations: leaf boxes in §6.5/§7.4/§8.5 intentionally unchecked (execution-phase evidence); A4 UA-W2 execution boxes intentionally unchecked until I001 PASS
external_mutations: none (authoring writes limited to S1/S2/S3 coordination artifacts)
review_disposition: window-agent authored; AWAITING_PARENT_DECOMPOSITION_REVIEW
```

---

## SUBWINDOW-DECOMPOSITION-READY certificate (sub-window standard §12.1)

```yaml
certificate: SUBWINDOW-DECOMPOSITION-READY
parent_window_id: UA-W2
parent_assignment_id: ASG-UA-W2-01
window_agent_identity: UA-W2-WINDOW-AGENT
revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract: a33ae1d8af4442de2680dc70f2c6e793a668b1400f0814833489061848c9baef
  decision: 8faaa4e2411235d8a83ec94de6a07e53c54ece91d99121a3c0e09cb6052f4300
  parent_checklist: 626c2a7034c88fc9f2f13e25929801b637aed682cd4c5d521de981c593dc7165
  decomposition: 722705abcafae622c8badee95ff157741297c11a6b0541f76d307edffd10a368
initial_subwindow_ids: [UA-W2-S001, UA-W2-S002, UA-W2-S003]
initial_subwindow_count: 3
planned_file_set: [frontend/components/landing-sections.tsx, frontend/components/section-intro.tsx, frontend/test/uphunt-aesthetic-w2.test.ts]
planned_file_set_digest: 1c9285240ded48856d6cddff5088aec458d6c6d70a92c5d54bf4ad3f9c940f4d
unmapped_parent_requirements: []
unmapped_parent_decisions: []
unmapped_parent_tasks: []
unmapped_coverage_cases: []
duplicate_initial_file_owners: []
multi_file_subwindows: []
unresolved_interfaces: []
unresolved_intermediate_states: []
unresolved_execution_choices: []
unresolved_evidence_references: []
mandatory_authoring_items_checked: 47
mandatory_authoring_items_unchecked: 0
first_subwindow: UA-W2-S001
integration_assessment_id: UA-W2-I001
parent_review_required: true
```

Notes: `unmapped_*` are empty for this window — REQ-UA-001/002/006/007, DEC-UA-001/002/006/
007/008/011/013/014, UA-W2-T1..T3, SCN-UA-001/002, NC-UA-001/002, and CASE-UA-W2-001..004
are fully allocated in `S1` §5; the remaining 39 CASE IDs are allocated to later windows by
the `A4` §Coverage `test_registration` column and are not `UA-W2` requirements.

---

## EV-UA2-D-004 — parent rejection of decomposition v1 and in-place correction

```yaml
evidence_id: EV-UA2-D-004
timestamp: 2026-09-01T19:25:04+05:30
parent_window: UA-W2
subwindow: decomposition correction (parent decomposition review returned; S1 not frozen, in-place correction parent-authorized)
assignment_id: ASG-UA-W2-01
actor: UA-W2-WINDOW-AGENT (window agent)
trigger:
  - parent rejected decomposition v1 (S1 722705abcafae622c8badee95ff157741297c11a6b0541f76d307edffd10a368, S2 87d37624946338ac435a9b06ecbd472b230d59d45be15c56674fa40c4b9d5591); parent confirmed S1/S2/S3 digests, pins, planned-file digest 1c928524…, W2 case digest 02f92049…, predecessor f5137be4…, and no-implementation-started all verified; the sole finding was S1 §7.2 Edit 2
root_cause:
  - S1 §7.2 Edit 2 miscounted the deletion block as "16 lines: the 15 function lines plus its trailing blank line"; the actual block is the 14 function lines at current lines 52–65 plus the trailing blank line at line 66 = exactly 15 lines, with `export function LandingProcess({ variant = "start" }: { variant?: LandingVariant }) {` at current line 67
  - a leaf executing "delete 16 lines from line 52" literally would have deleted the LandingProcess opening line — contradicting §3 and anchor B; classification: mechanical authoring defect (§0.3 scope-relative), not a missing parent decision
governing_parent_requirements: [REQ-UA-002, REQ-UA-007]
governing_parent_decisions: [DEC-UA-002]
corrected_prior_artifacts:
  - S1 v1 722705ab… -> S1 v2 fe25229d5bb48acf2b3bcf8a1fa699c8ea6b41c9170daf847cee453054f86d89 (in-place correction of §7.2 Edit 2 only, parent-authorized because the decomposition was rejected and therefore not frozen; §2.1 immutability applies only after parent acceptance)
  - S2 decomposition_revision refreshed to fe25229d…; prose records the resubmission; S2 revision 4b2bba9db796e0e0ee9acd3ddb03cea7a5865f869730c3e8d2ce46021bb96879
  - this S3 header companion pointers refreshed; EV-UA2-D-003 retained verbatim as history
unchanged_and_reverified:
  - planned_file_set_digest 1c9285240ded48856d6cddff5088aec458d6c6d70a92c5d54bf4ad3f9c940f4d
  - required W2 case set digest 02f920493c7935e2ecd5a3fd3edf1a97450a915add21b63d4183de1a14f449dd
  - pins (standards, A1, A3, A4) and predecessor digest f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1
  - DAG S001 -> S002 -> S003 -> I001; §5.1 interface; §6.3 and §8.3 byte-exact contents; §4.1 intermediate states; §9 gates incl. G2 needles and I001 lint
commands:
  - read frontend/components/landing-sections.tsx lines 50–67 (witness: 52–65 function, 66 blank, 67 LandingProcess)
  - grep S1 for "16 lines|15 function|lines 52|line 66|line 67" -> no stale count remains; §3 line 90 (52–65), §7.2 anchor B line 389 (52–66), Edit 2 lines 402–404 (15 lines; 67 protected)
  - sha256sum S1/S2/S3 after edits
sandbox_privilege_used: none (read-only verification + coordination-artifact writes only)
decisive_results:
  - Edit 2 now prescribes exactly 15 lines and explicitly protects current line 67; anchors §3/anchor B/Edit 2 agree
  - document lint re-run after edit: 15/15 required §7.1 fields present in each FILE block; subwindow IDs unique; 0 unresolved references
  - decomposition_status remains AWAITING_PARENT_DECOMPOSITION_REVIEW; no leaf assigned; A5 untouched (stays ASG-UA-W2-01 / IN_PROGRESS); no implementation file modified
limitations: none
external_mutations: none
review_disposition: window-agent corrected; resubmitted for parent decomposition review
```

## SUBWINDOW-DECOMPOSITION-READY certificate v2 (supersedes the v1 certificate above; v1 retained as history with its rejected S1 revision)

```yaml
certificate: SUBWINDOW-DECOMPOSITION-READY
supersedes: SUBWINDOW-DECOMPOSITION-READY v1 (attached to EV-UA2-D-003; rejected by parent over S1 §7.2 Edit 2)
parent_window_id: UA-W2
parent_assignment_id: ASG-UA-W2-01
window_agent_identity: UA-W2-WINDOW-AGENT
revisions:
  parent_standard: cda352017e75c0d11f6797d9fbe108b4365508cd38b0e92365cfb523ede32848
  subwindow_standard: 842c29550c06c22d63e0a058a27cb8a9ff6b538b3168d2c83a384890b44247f0
  contract: a33ae1d8af4442de2680dc70f2c6e793a668b1400f0814833489061848c9baef
  decision: 8faaa4e2411235d8a83ec94de6a07e53c54ece91d99121a3c0e09cb6052f4300
  parent_checklist: 626c2a7034c88fc9f2f13e25929801b637aed682cd4c5d521de981c593dc7165
  decomposition: fe25229d5bb48acf2b3bcf8a1fa699c8ea6b41c9170daf847cee453054f86d89
initial_subwindow_ids: [UA-W2-S001, UA-W2-S002, UA-W2-S003]
initial_subwindow_count: 3
planned_file_set: [frontend/components/landing-sections.tsx, frontend/components/section-intro.tsx, frontend/test/uphunt-aesthetic-w2.test.ts]
planned_file_set_digest: 1c9285240ded48856d6cddff5088aec458d6c6d70a92c5d54bf4ad3f9c940f4d
unmapped_parent_requirements: []
unmapped_parent_decisions: []
unmapped_parent_tasks: []
unmapped_coverage_cases: []
duplicate_initial_file_owners: []
multi_file_subwindows: []
unresolved_interfaces: []
unresolved_intermediate_states: []
unresolved_execution_choices: []
unresolved_evidence_references: []
mandatory_authoring_items_checked: 47
mandatory_authoring_items_unchecked: 0
first_subwindow: UA-W2-S001
integration_assessment_id: UA-W2-I001
parent_review_required: true
```

---

## EV-UA2-X-001 — READY conversion and S001 assignment (requester-directed)

```yaml
evidence_id: EV-UA2-X-001
timestamp: 2026-09-01T19:32:00+05:30
parent_window: UA-W2
subwindow: UA-W2-S001
assignment_id: ASG-UA-W2-01-S001
actor: parent (requester-directed conversion normally reserved to UA-W2-WINDOW-AGENT)
role: parent executing EV-UA-A-026 follow-through at requester instruction
frozen_revisions:
  decomposition_S1: fe25229d5bb48acf2b3bcf8a1fa699c8ea6b41c9170daf847cee453054f86d89
  parent_approval: EV-UA-A-026
operation: set S2.decomposition_status READY; issue ASG-UA-W2-01-S001; assign UA-W2-WINDOW-AGENT as the dispatchable S001 executor; A5 left byte-unchanged so S001 P1 A5 digest cf0c580a… still holds
observed_result: |
  S2 89b9d8aed44b12da84d1b69d0b8e7f7eb55c86fd70375f3d776078db00f42d2b;
  decomposition_status READY; current_subwindow UA-W2-S001;
  current_assignment_id ASG-UA-W2-01-S001; assigned_agent UA-W2-WINDOW-AGENT;
  authorized_write_file frontend/components/section-intro.tsx; current_status READY;
  next_subwindow STOP; section-intro.tsx still ABSENT
decisive_assertion: UA-W2-WINDOW-AGENT is dispatchable; S001 may now CREATE S1 §6.3 bytes; S002 is not authorized until S001 review
sandbox_privilege: none
environment_invalidated_attempt: none
artifacts: UA-W2_SUBWINDOW_STATE_S2.yaml
negative_control: starting S002 or UA-W3 under this S2 would violate next_subwindow STOP and A5 prohibited_actions
external_mutations: none
```

---

## FILE-SUBWINDOW-EXECUTED — UA-W2-S001

```yaml
certificate: FILE-SUBWINDOW-EXECUTED
parent_window_id: UA-W2
subwindow_id: UA-W2-S001
assignment_id: ASG-UA-W2-01-S001
agent_identity: UA-W2-WINDOW-AGENT
writable_file: frontend/components/section-intro.tsx
starting_file_digest: ABSENT
ending_file_digest: 159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
attributable_changed_file_set: [frontend/components/section-intro.tsx]
required_local_cases: []
registered_local_cases: []
executed_local_cases: []
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
missing_activation_witnesses: []
negative_controls_expected: 1
negative_controls_falsified: 1
commands:
  - sha256sum components/section-intro.tsx -> 159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175 (byte-identical to S1 §6.3; not rewritten)
  - P1 git status --porcelain frontend + coordination root -> frontend §3 inventory + section-intro.tsx + coordination artifacts; coordination root clean; A5 digest cf0c580a… unchanged
  - V-A npx tsc --noEmit --incremental false --pretty false -> exit 0; 10 parked SRC-UA-0092 diagnostics only; ZERO lines containing section-intro
  - V-B in-memory NC probe N1 -> (a) all CASE-UA-W2-002 regexes match; (b) defective inverse className regex fails
  - V-C git status --porcelain -> attributable implementation delta exactly frontend/components/section-intro.tsx
deferred_integration_checks: [UA-W2-I001 gates per §9]
external_mutations: []
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
review_disposition: ACCEPTED_FOR_INTEGRATION
timestamp: 2026-09-01T19:45:00+05:30
```

---

## FILE-SUBWINDOW-EXECUTED — UA-W2-S002

```yaml
certificate: FILE-SUBWINDOW-EXECUTED
parent_window_id: UA-W2
subwindow_id: UA-W2-S002
assignment_id: ASG-UA-W2-01-S002
agent_identity: UA-W2-WINDOW-AGENT
writable_file: frontend/components/landing-sections.tsx
starting_file_digest: 33f7670852e90b781225f21049e54f275fed93f4f2603c73678064066c0babce
ending_file_digest: 914c61e593dca0863e49603cba7a38c783197157c6da89a8eaf61eb3ef69fe15
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
attributable_changed_file_set: [frontend/components/landing-sections.tsx]
required_local_cases: []
registered_local_cases: []
executed_local_cases: []
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
missing_activation_witnesses: []
negative_controls_expected: 1
negative_controls_falsified: 1
commands:
  - Edit 1: inserted import { SectionIntro } from "@/components/section-intro"; before traffic-globe import
  - Edit 2: deleted exactly 15 lines (local function SectionIntro lines 52-66); LandingProcess protected
  - P2 sha256sum before 33f76708…; after 914c61e5…; predecessor section-intro.tsx 159096f3… verified
  - V-A npx tsc --noEmit --incremental false --pretty false -> exit 0; 10 parked diagnostics; ZERO section-intro or landing-sections lines
  - V-B node inspection -> import count 1; function SectionIntro count 0; <SectionIntro call sites 3
  - V-C NC probe -> (a) passes; (b) re-inserted local function detected
  - V-D git status -> attributable implementation delta exactly landing-sections.tsx (plus S001 file and coordination artifacts)
deferred_integration_checks: [UA-W2-I001 gates per §9]
external_mutations: []
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
review_disposition: ACCEPTED_FOR_INTEGRATION
timestamp: 2026-09-01T19:47:00+05:30
```

---

## FILE-SUBWINDOW-EXECUTED — UA-W2-S003

```yaml
certificate: FILE-SUBWINDOW-EXECUTED
parent_window_id: UA-W2
subwindow_id: UA-W2-S003
assignment_id: ASG-UA-W2-01-S003
agent_identity: UA-W2-WINDOW-AGENT
writable_file: frontend/test/uphunt-aesthetic-w2.test.ts
starting_file_digest: ABSENT
ending_file_digest: f65ba0c50c78ef983496d0a37af1a1a6a1234332c48a5290bc344c9a5e68b78c
starting_repository_change_set_digest: e64ba5df31d4ad314a69c4fe784bf659d098e316f5d7acbc0690b7d58e53c450
attributable_changed_file_set: [frontend/test/uphunt-aesthetic-w2.test.ts]
required_local_cases: [CASE-UA-W2-001, CASE-UA-W2-002, CASE-UA-W2-003, CASE-UA-W2-004]
registered_local_cases: [CASE-UA-W2-001, CASE-UA-W2-002, CASE-UA-W2-003, CASE-UA-W2-004]
executed_local_cases: [CASE-UA-W2-001, CASE-UA-W2-002, CASE-UA-W2-003, CASE-UA-W2-004]
skipped_local_cases: []
duplicate_case_ids: []
unexpected_case_ids: []
missing_activation_witnesses: []
negative_controls_expected: 2
negative_controls_falsified: 2
commands:
  - CREATE byte-exact S1 §8.3 content
  - V-A node --experimental-strip-types --test test/uphunt-aesthetic-w2.test.ts -> exit 0; 6 pass (2 W1 registry + 4 W2); 0 fail; 0 skipped
  - V-B cat test/.ua-executed.json -> 6 sorted unique IDs (CASE-UA-W1-001, CASE-UA-W1-002, CASE-UA-W2-001..004)
  - V-C NC N1 in /tmp/opencode/ua-w2-nc -> delete --color-signal line fails CASE-UA-W2-001 oracle
  - V-C NC N2 in /tmp/opencode/ua-w2-nc -> delete reduced-motion block fails CASE-UA-W2-004 oracle
  - V-D rm -f test/.ua-executed.json -> attributable implementation delta exactly uphunt-aesthetic-w2.test.ts
deferred_integration_checks: [UA-W2-I001 gates per §9]
external_mutations: []
prohibited_actions_observed: []
successor_work_started: false
direct_parent_communication: false
status: AWAITING_WINDOW_REVIEW
review_disposition: ACCEPTED_FOR_INTEGRATION
timestamp: 2026-09-01T19:49:00+05:30
```

---

## WINDOW-AGENT-INTEGRATION-PASS — UA-W2-I001

```yaml
certificate: WINDOW-AGENT-INTEGRATION-PASS
integration_assessment_id: UA-W2-I001
parent_window_id: UA-W2
parent_assignment_id: ASG-UA-W2-01
agent_identity: UA-W2-WINDOW-AGENT
accepted_initial_subwindows: [ASG-UA-W2-01-S001, ASG-UA-W2-01-S002, ASG-UA-W2-01-S003]
expected_changed_file_set:
  - frontend/components/section-intro.tsx
  - frontend/components/landing-sections.tsx
  - frontend/test/uphunt-aesthetic-w2.test.ts
ending_file_digests:
  section-intro.tsx: 159096f313aa6c8d1be343f1db72511529fb4795c79be3123da9c3c3a0c38175
  landing-sections.tsx: 914c61e593dca0863e49603cba7a38c783197157c6da89a8eaf61eb3ef69fe15
  uphunt-aesthetic-w2.test.ts: f65ba0c50c78ef983496d0a37af1a1a6a1234332c48a5290bc344c9a5e68b78c
required_case_count: 4
registered_case_count: 4
executed_case_count: 4
required_case_set_digest: 02f920493c7935e2ecd5a3fd3edf1a97450a915add21b63d4183de1a14f449dd
gates:
  G0: PASS — coverage digest f5137be495e260a1bf07f141247ca02c7a1c975fbaa526ae5b3b80828600c6d1; REQUIRED_CASE_IDS unchanged
  G1: PASS — npm test exit 0; 156 pass / 0 fail / 0 skipped; CASE-UA-W2-001..004 activated
  G2: PASS — npx tsc --noEmit --pretty false; zero diagnostics on section-intro, landing-sections, uphunt-aesthetic-w2.test.ts; 10 parked SRC-UA-0092 diagnostics remain
  G3: PASS — npm run lint exit 0
  G4: SKIPPED — browser_evidence false
  G5: PASS — test/.ua-executed.json = 6 sorted IDs (2 W1 + 4 W2); 4/4/4 window-local; zero skips/duplicates/unexpected
  G6: PASS — implementation delta = three §2 files; globals.css byte-unchanged; coordination root clean; no forbidden paths
  G7: PASS — imports node builtins + coverage registry only; 0 network, 0 DB
  G8: PASS — NC-UA-001 N1/N2 re-executed in /tmp; NC-UA-002 cited from S001 V-B and S002 V-C
  G9: PASS — no UA-W3 artifacts; A5.current_window UA-W2; may_start_successor false
status: READY_FOR_PARENT_REVIEW
timestamp: 2026-09-01T19:52:00+05:30
handoff: frontend/review-evidence/uphunt-aesthetic/UA-W2_HANDOFF.md
```
