<?php
class Validator {
    
    /**
     * Validate an incoming JSON body against a set of rules.
     * 
     * @param array|null $data The input data to validate
     * @param array $rules Associative array where key is field name and value is a string of rules separated by |
     * @return array ['success' => true/false, 'errors' => array of errors]
     */
    public static function validate($data, $rules) {
        if ($data === null) {
            return ['success' => false, 'errors' => ['body' => 'Invalid JSON payload.']];
        }

        $errors = [];

        foreach ($rules as $field => $ruleString) {
            $fieldRules = explode('|', $ruleString);
            $value = isset($data[$field]) ? $data[$field] : null;

            foreach ($fieldRules as $rule) {
                // Parse rule with parameter, e.g. min:5
                $ruleParts = explode(':', $rule);
                $ruleName = $ruleParts[0];
                $ruleParam = isset($ruleParts[1]) ? $ruleParts[1] : null;

                if ($ruleName === 'required') {
                    if (empty($value) && $value !== '0' && $value !== 0 && $value !== false) {
                        $errors[$field][] = "The {$field} field is required.";
                    }
                }

                if (!empty($value)) {
                    if ($ruleName === 'email') {
                        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                            $errors[$field][] = "The {$field} must be a valid email address.";
                        }
                    }

                    if ($ruleName === 'min') {
                        if (is_string($value) && strlen($value) < (int)$ruleParam) {
                            $errors[$field][] = "The {$field} must be at least {$ruleParam} characters.";
                        } elseif (is_numeric($value) && $value < (float)$ruleParam) {
                            $errors[$field][] = "The {$field} must be at least {$ruleParam}.";
                        }
                    }
                    
                    if ($ruleName === 'in') {
                        $allowedValues = explode(',', $ruleParam);
                        if (!in_array($value, $allowedValues)) {
                            $errors[$field][] = "The {$field} must be one of: " . implode(', ', $allowedValues) . ".";
                        }
                    }
                    
                    if ($ruleName === 'mongoid') {
                        // Very basic mongodb id check: 24 hex characters
                        if (!preg_match('/^[a-f\d]{24}$/i', (string)$value)) {
                            $errors[$field][] = "The {$field} must be a valid ObjectId.";
                        }
                    }
                    
                    if ($ruleName === 'date') {
                        if (!strtotime($value)) {
                            $errors[$field][] = "The {$field} must be a valid date.";
                        }
                    }
                }
            }
        }

        return [
            'success' => empty($errors),
            'errors' => $errors
        ];
    }
}
