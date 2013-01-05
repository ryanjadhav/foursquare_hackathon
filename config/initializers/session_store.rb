# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_foursquare_test_session',
  :secret      => 'ac18c681fc8e86e607349e95c20d6df6a5067252ab269260511dcd790bced58b4f0dec4d7bca4aba275fb74be06262b229a893bc69e2a6b7e26430cfede4e9d1'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
