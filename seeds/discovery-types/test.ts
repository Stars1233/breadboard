/**
 * A collection of source attributions for a piece of content. */
export interface CitationMetadata {
  /**
   * Citations to sources for a specific response. */
  citationSources?: CitationSource[];
}

/**
 * A citation to a source for a portion of a specific response. */
export interface CitationSource {
  /**
   * Optional. End of the attributed segment, exclusive. */
  endIndex?: number;

  /**
   * Optional. License for the GitHub project that is attributed as a source for segment. License info is required for code citations. */
  license?: string;

  /**
   * Optional. Start of segment of the response that is attributed to this source. Index indicates the start of the segment, measured in bytes. */
  startIndex?: number;

  /**
   * Optional. URI that is attributed as a source for a portion of the text. */
  uri?: string;
}

/**
 * Content filtering metadata associated with processing a single request. ContentFilter contains a reason and an optional supporting string. The reason may be unspecified. */
export interface ContentFilter {
  /**
   * A string that describes the filtering behavior in more detail. */
  message?: string;

  /**
   * The reason content was blocked during request processing. */
  reason?: "BLOCKED_REASON_UNSPECIFIED" | "SAFETY" | "OTHER";
}

/**
 * Counts the number of tokens in the `prompt` sent to a model. Models may tokenize text differently, so each model may return a different `token_count`. */
export interface CountMessageTokensRequest {
  /**
   * Required. The prompt, whose token count is to be returned. */
  prompt?: MessagePrompt;
}

/**
 * A response from `CountMessageTokens`. It returns the model's `token_count` for the `prompt`. */
export interface CountMessageTokensResponse {
  /**
   * The number of tokens that the `model` tokenizes the `prompt` into. Always non-negative. */
  tokenCount?: number;
}

/**
 * Request to get a text embedding from the model. */
export interface EmbedTextRequest {
  /**
   * Required. The free-form input text that the model will turn into an embedding. */
  text?: string;
}

/**
 * The response to a EmbedTextRequest. */
export interface EmbedTextResponse {
  /**
   * Output only. The embedding generated from the input text. */
  embedding?: Embedding;
}

/**
 * A list of floats representing the embedding. */
export interface Embedding {
  /**
   * The embedding values. */
  value?: number[];
}

/**
 * An input/output example used to instruct the Model. It demonstrates how the model should respond or format its response. */
export interface Example {
  /**
   * Required. An example of an input `Message` from the user. */
  input?: Message;

  /**
   * Required. An example of what the model should output given the input. */
  output?: Message;
}

/**
 * Request to generate a message response from the model. */
export interface GenerateMessageRequest {
  /**
   * Optional. The number of generated response messages to return. This value must be between `[1, 8]`, inclusive. If unset, this will default to `1`. */
  candidateCount?: number;

  /**
   * Required. The structured textual input given to the model as a prompt. Given a prompt, the model will return what it predicts is the next message in the discussion. */
  prompt?: MessagePrompt;

  /**
   * Optional. Controls the randomness of the output. Values can range over `[0.0,1.0]`, inclusive. A value closer to `1.0` will produce responses that are more varied, while a value closer to `0.0` will typically result in less surprising responses from the model. */
  temperature?: number;

  /**
   * Optional. The maximum number of tokens to consider when sampling. The model uses combined Top-k and nucleus sampling. Top-k sampling considers the set of `top_k` most probable tokens. */
  topK?: number;

  /**
   * Optional. The maximum cumulative probability of tokens to consider when sampling. The model uses combined Top-k and nucleus sampling. Nucleus sampling considers the smallest set of tokens whose probability sum is at least `top_p`. */
  topP?: number;
}

/**
 * The response from the model. This includes candidate messages and conversation history in the form of chronologically-ordered messages. */
export interface GenerateMessageResponse {
  /**
   * Candidate response messages from the model. */
  candidates?: Message[];

  /**
   * A set of content filtering metadata for the prompt and response text. This indicates which `SafetyCategory`(s) blocked a candidate from this response, the lowest `HarmProbability` that triggered a block, and the HarmThreshold setting for that category. */
  filters?: ContentFilter[];

  /**
   * The conversation history used by the model. */
  messages?: Message[];
}

/**
 * Request to generate a text completion response from the model. */
export interface GenerateTextRequest {
  /**
   * Number of generated responses to return. This value must be between [1, 8], inclusive. If unset, this will default to 1. */
  candidateCount?: number;

  /**
   * The maximum number of tokens to include in a candidate. If unset, this will default to 64. */
  maxOutputTokens?: number;

  /**
   * Required. The free-form input text given to the model as a prompt. Given a prompt, the model will generate a TextCompletion response it predicts as the completion of the input text. */
  prompt?: TextPrompt;

  /**
   * A list of unique `SafetySetting` instances for blocking unsafe content. that will be enforced on the `GenerateTextRequest.prompt` and `GenerateTextResponse.candidates`. There should not be more than one setting for each `SafetyCategory` type. The API will block any prompts and responses that fail to meet the thresholds set by these settings. This list overrides the default settings for each `SafetyCategory` specified in the safety_settings. If there is no `SafetySetting` for a given `SafetyCategory` provided in the list, the API will use the default safety setting for that category. */
  safetySettings?: SafetySetting[];

  /**
   * The set of character sequences (up to 5) that will stop output generation. If specified, the API will stop at the first appearance of a stop sequence. The stop sequence will not be included as part of the response. */
  stopSequences?: string[];

  /**
   * Controls the randomness of the output. Note: The default value varies by model, see the `Model.temperature` attribute of the `Model` returned the `getModel` function. Values can range from [0.0,1.0], inclusive. A value closer to 1.0 will produce responses that are more varied and creative, while a value closer to 0.0 will typically result in more straightforward responses from the model. */
  temperature?: number;

  /**
   * The maximum number of tokens to consider when sampling. The model uses combined Top-k and nucleus sampling. Top-k sampling considers the set of `top_k` most probable tokens. Defaults to 40. Note: The default value varies by model, see the `Model.top_k` attribute of the `Model` returned the `getModel` function. */
  topK?: number;

  /**
   * The maximum cumulative probability of tokens to consider when sampling. The model uses combined Top-k and nucleus sampling. Tokens are sorted based on their assigned probabilities so that only the most liekly tokens are considered. Top-k sampling directly limits the maximum number of tokens to consider, while Nucleus sampling limits number of tokens based on the cumulative probability. Note: The default value varies by model, see the `Model.top_p` attribute of the `Model` returned the `getModel` function. */
  topP?: number;
}

/**
 * The response from the model, including candidate completions. */
export interface GenerateTextResponse {
  /**
   * Candidate responses from the model. */
  candidates?: TextCompletion[];

  /**
   * A set of content filtering metadata for the prompt and response text. This indicates which `SafetyCategory`(s) blocked a candidate from this response, the lowest `HarmProbability` that triggered a block, and the HarmThreshold setting for that category. This indicates the smallest change to the `SafetySettings` that would be necessary to unblock at least 1 response. The blocking is configured by the `SafetySettings` in the request (or the default `SafetySettings` of the API). */
  filters?: ContentFilter[];

  /**
   * Returns any safety feedback related to content filtering. */
  safetyFeedback?: SafetyFeedback[];
}

/**
 * Response from `ListModel` containing a paginated list of Models. */
export interface ListModelsResponse {
  /**
   * The returned Models. */
  models?: Model[];

  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no more pages. */
  nextPageToken?: string;
}

/**
 * The base unit of structured text. A `Message` includes an `author` and the `content` of the `Message`. The `author` is used to tag messages when they are fed to the model as text. */
export interface Message {
  /**
   * Optional. The author of this Message. This serves as a key for tagging the content of this Message when it is fed to the model as text. The author can be any alphanumeric string. */
  author?: string;

  /**
   * Output only. Citation information for model-generated `content` in this `Message`. If this `Message` was generated as output from the model, this field may be populated with attribution information for any text included in the `content`. This field is used only on output. */
  citationMetadata?: CitationMetadata;

  /**
   * Required. The text content of the structured `Message`. */
  content?: string;
}

/**
 * All of the structured input text passed to the model as a prompt. A `MessagePrompt` contains a structured set of fields that provide context for the conversation, examples of user input/model output message pairs that prime the model to respond in different ways, and the conversation history or list of messages representing the alternating turns of the conversation between the user and the model. */
export interface MessagePrompt {
  /**
   * Optional. Text that should be provided to the model first to ground the response. If not empty, this `context` will be given to the model first before the `examples` and `messages`. When using a `context` be sure to provide it with every request to maintain continuity. This field can be a description of your prompt to the model to help provide context and guide the responses. Examples: "Translate the phrase from English to French." or "Given a statement, classify the sentiment as happy, sad or neutral." Anything included in this field will take precedence over message history if the total input size exceeds the model's `input_token_limit` and the input request is truncated. */
  context?: string;

  /**
   * Optional. Examples of what the model should generate. This includes both user input and the response that the model should emulate. These `examples` are treated identically to conversation messages except that they take precedence over the history in `messages`: If the total input size exceeds the model's `input_token_limit` the input will be truncated. Items will be dropped from `messages` before `examples`. */
  examples?: Example[];

  /**
   * Required. A snapshot of the recent conversation history sorted chronologically. Turns alternate between two authors. If the total input size exceeds the model's `input_token_limit` the input will be truncated: The oldest items will be dropped from `messages`. */
  messages?: Message[];
}

/**
 * Information about a Generative Language Model. */
export interface Model {
  /**
   * Required. The name of the base model, pass this to the generation request. Examples: * `chat-bison` */
  baseModelId?: string;

  /**
   * A short description of the model. */
  description?: string;

  /**
   * The human-readable name of the model. E.g. "Chat Bison". The name can be up to 128 characters long and can consist of any UTF-8 characters. */
  displayName?: string;

  /**
   * Maximum number of input tokens allowed for this model. */
  inputTokenLimit?: number;

  /**
   * Required. The resource name of the `Model`. Format: `models/{model}` with a `{model}` naming convention of: * "{base_model_id}-{version}" Examples: * `models/chat-bison-001` */
  name?: string;

  /**
   * Maximum number of output tokens available for this model. */
  outputTokenLimit?: number;

  /**
   * The model's supported generation methods. The method names are defined as Pascal case strings, such as `generateMessage` which correspond to API methods. */
  supportedGenerationMethods?: string[];

  /**
   * Controls the randomness of the output. Values can range over `[0.0,1.0]`, inclusive. A value closer to `1.0` will produce responses that are more varied, while a value closer to `0.0` will typically result in less surprising responses from the model. This value specifies default to be used by the backend while making the call to the model. */
  temperature?: number;

  /**
   * For Top-k sampling. Top-k sampling considers the set of `top_k` most probable tokens. This value specifies default to be used by the backend while making the call to the model. */
  topK?: number;

  /**
   * For Nucleus sampling. Nucleus sampling considers the smallest set of tokens whose probability sum is at least `top_p`. This value specifies default to be used by the backend while making the call to the model. */
  topP?: number;

  /**
   * Required. The version number of the model. This represents the major version */
  version?: string;
}

/**
 * Safety feedback for an entire request. This field is populated if content in the input and/or response is blocked due to safety settings. SafetyFeedback may not exist for every HarmCategory. Each SafetyFeedback will return the safety settings used by the request as well as the lowest HarmProbability that should be allowed in order to return a result. */
export interface SafetyFeedback {
  /**
   * Safety rating evaluated from content. */
  rating?: SafetyRating;

  /**
   * Safety settings applied to the request. */
  setting?: SafetySetting;
}

/**
 * Safety rating for a piece of content. The safety rating contains the category of harm and the harm probability level in that category for a piece of content. Content is classified for safety across a number of harm categories and the probability of the harm classification is included here. */
export interface SafetyRating {
  /**
   * Required. The category for this rating. */
  category?:
    | "HARM_CATEGORY_UNSPECIFIED"
    | "HARM_CATEGORY_DEROGATORY"
    | "HARM_CATEGORY_TOXICITY"
    | "HARM_CATEGORY_VIOLENCE"
    | "HARM_CATEGORY_SEXUAL"
    | "HARM_CATEGORY_MEDICAL"
    | "HARM_CATEGORY_DANGEROUS";

  /**
   * Required. The probability of harm for this content. */
  probability?:
    | "HARM_PROBABILITY_UNSPECIFIED"
    | "NEGLIGIBLE"
    | "LOW"
    | "MEDIUM"
    | "HIGH";
}

/**
 * Safety setting, affecting the safety-blocking behavior. Passing a safety setting for a category changes the allowed proability that content is blocked. */
export interface SafetySetting {
  /**
   * Required. The category for this setting. */
  category?:
    | "HARM_CATEGORY_UNSPECIFIED"
    | "HARM_CATEGORY_DEROGATORY"
    | "HARM_CATEGORY_TOXICITY"
    | "HARM_CATEGORY_VIOLENCE"
    | "HARM_CATEGORY_SEXUAL"
    | "HARM_CATEGORY_MEDICAL"
    | "HARM_CATEGORY_DANGEROUS";

  /**
   * Required. Controls the probability threshold at which harm is blocked. */
  threshold?:
    | "HARM_BLOCK_THRESHOLD_UNSPECIFIED"
    | "BLOCK_LOW_AND_ABOVE"
    | "BLOCK_MEDIUM_AND_ABOVE"
    | "BLOCK_ONLY_HIGH";
}

/**
 * Output text returned from a model. */
export interface TextCompletion {
  /**
   * Output only. Citation information for model-generated `output` in this `TextCompletion`. This field may be populated with attribution information for any text included in the `output`. */
  citationMetadata?: CitationMetadata;

  /**
   * Output only. The generated text returned from the model. */
  output?: string;

  /**
   * Ratings for the safety of a response. There is at most one rating per category. */
  safetyRatings?: SafetyRating[];
}

/**
 * Text given to the model as a prompt. The Model will use this TextPrompt to Generate a text completion. */
export interface TextPrompt {
  /**
   * Required. The prompt text. */
  text?: string;
}

