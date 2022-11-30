chrome.storage.session
  .setAccessLevel({ accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS" })
  .then(() => {
    console.log("Access level set to TRUSTED_AND_UNTRUSTED_CONTEXTS");
  });
